from fastapi import APIRouter, Depends, HTTPException
from typing import List
from database import get_database
from models.enquiry import EnquiryIn, EnquiryOut
from auth import get_current_admin
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/enquiries", tags=["enquiries"])

def enquiry_helper(enquiry) -> dict:
    enquiry["id"] = str(enquiry["_id"])
    del enquiry["_id"]
    return enquiry

@router.post("/", response_model=EnquiryOut)
async def create_enquiry(enquiry: EnquiryIn):
    db = get_database()
    enquiry_dict = enquiry.model_dump()
    enquiry_dict["status"] = "new"
    enquiry_dict["created_at"] = datetime.utcnow()
    new_enquiry = await db["enquiries"].insert_one(enquiry_dict)
    created_enquiry = await db["enquiries"].find_one({"_id": new_enquiry.inserted_id})
    return enquiry_helper(created_enquiry)

@router.get("/", response_model=List[EnquiryOut])
async def get_enquiries(admin: dict = Depends(get_current_admin)):
    db = get_database()
    enquiries = await db["enquiries"].find().sort("created_at", -1).to_list(1000)
    return [enquiry_helper(e) for e in enquiries]

@router.put("/{id}", response_model=EnquiryOut)
async def update_enquiry_status(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    update_result = await db["enquiries"].update_one(
        {"_id": ObjectId(id)}, {"$set": {"status": "responded"}}
    )
    if update_result.modified_count == 1 or update_result.matched_count == 1:
        updated_enquiry = await db["enquiries"].find_one({"_id": ObjectId(id)})
        return enquiry_helper(updated_enquiry)
    raise HTTPException(status_code=404, detail="Enquiry not found")

@router.delete("/{id}")
async def delete_enquiry(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    delete_result = await db["enquiries"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Enquiry not found")
