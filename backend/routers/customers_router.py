from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import get_database
from models.customer import CustomerIn, CustomerOut
from auth import get_current_admin
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/customers", tags=["customers"])

def customer_helper(customer) -> dict:
    customer["id"] = str(customer["_id"])
    del customer["_id"]
    return customer

@router.get("/", response_model=List[CustomerOut])
async def get_all_customers(admin: dict = Depends(get_current_admin)):
    db = get_database()
    customers = await db["customers"].find().sort("created_at", -1).to_list(1000)
    return [customer_helper(c) for c in customers]

@router.get("/{id}", response_model=CustomerOut)
async def get_customer(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    customer = await db["customers"].find_one({"_id": ObjectId(id)})
    if customer:
        return customer_helper(customer)
    raise HTTPException(status_code=404, detail="Customer not found")

@router.post("/", response_model=CustomerOut)
async def create_customer(customer: CustomerIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    customer_dict = customer.model_dump()
    customer_dict["created_at"] = datetime.utcnow()
    customer_dict["created_by"] = admin["username"]
    new_customer = await db["customers"].insert_one(customer_dict)
    created_customer = await db["customers"].find_one({"_id": new_customer.inserted_id})
    return customer_helper(created_customer)

@router.put("/{id}", response_model=CustomerOut)
async def update_customer(id: str, customer: CustomerIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    customer_dict = customer.model_dump()
    update_result = await db["customers"].update_one(
        {"_id": ObjectId(id)}, {"$set": customer_dict}
    )
    if update_result.modified_count == 1 or update_result.matched_count == 1:
        updated_customer = await db["customers"].find_one({"_id": ObjectId(id)})
        return customer_helper(updated_customer)
    raise HTTPException(status_code=404, detail="Customer not found")

@router.delete("/{id}")
async def delete_customer(id: str, admin: dict = Depends(get_current_admin)):
    if admin["role"] != "super_admin":
        raise HTTPException(status_code=403, detail="Only super admins can delete customers")
    db = get_database()
    delete_result = await db["customers"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Customer not found")
