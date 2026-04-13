from fastapi import APIRouter, Depends, HTTPException
from typing import List
from database import get_database
from models.product import ProductIn, ProductOut
from auth import get_current_admin
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["products"])

def product_helper(product) -> dict:
    product["id"] = str(product["_id"])
    del product["_id"]
    return product

@router.get("/", response_model=List[ProductOut])
async def get_all_products():
    db = get_database()
    products = await db["products"].find().sort("created_at", -1).to_list(1000)
    return [product_helper(p) for p in products]

@router.get("/featured", response_model=List[ProductOut])
async def get_featured_products():
    db = get_database()
    products = await db["products"].find({"is_featured": True}).sort("created_at", -1).to_list(1000)
    return [product_helper(p) for p in products]

@router.get("/{id}", response_model=ProductOut)
async def get_product(id: str):
    db = get_database()
    product = await db["products"].find_one({"_id": ObjectId(id)})
    if product:
        return product_helper(product)
    raise HTTPException(status_code=404, detail="Product not found")

@router.post("/", response_model=ProductOut)
async def create_product(product: ProductIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    product_dict = product.model_dump()
    product_dict["created_at"] = datetime.utcnow()
    new_product = await db["products"].insert_one(product_dict)
    created_product = await db["products"].find_one({"_id": new_product.inserted_id})
    return product_helper(created_product)

@router.put("/{id}", response_model=ProductOut)
async def update_product(id: str, product: ProductIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    product_dict = product.model_dump()
    update_result = await db["products"].update_one(
        {"_id": ObjectId(id)}, {"$set": product_dict}
    )
    if update_result.modified_count == 1 or update_result.matched_count == 1:
        updated_product = await db["products"].find_one({"_id": ObjectId(id)})
        return product_helper(updated_product)
    raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{id}")
async def delete_product(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    delete_result = await db["products"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Product not found")
