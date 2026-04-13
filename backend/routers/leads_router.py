from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import get_database
from models.lead import LeadIn, LeadOut
from auth import get_current_admin
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/leads", tags=["leads"])

def lead_helper(lead) -> dict:
    lead["id"] = str(lead["_id"])
    del lead["_id"]
    return lead

@router.get("/", response_model=List[LeadOut])
async def get_all_leads(admin: dict = Depends(get_current_admin)):
    db = get_database()
    leads = await db["leads"].find().sort("created_at", -1).to_list(1000)
    return [lead_helper(l) for l in leads]

@router.get("/{id}", response_model=LeadOut)
async def get_lead(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    lead = await db["leads"].find_one({"_id": ObjectId(id)})
    if lead:
        return lead_helper(lead)
    raise HTTPException(status_code=404, detail="Lead not found")

@router.post("/", response_model=LeadOut)
async def create_lead(lead: LeadIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    lead_dict = lead.model_dump()
    lead_dict["created_at"] = datetime.utcnow()
    new_lead = await db["leads"].insert_one(lead_dict)
    created_lead = await db["leads"].find_one({"_id": new_lead.inserted_id})
    return lead_helper(created_lead)

@router.put("/{id}", response_model=LeadOut)
async def update_lead(id: str, lead: LeadIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    lead_dict = lead.model_dump()
    update_result = await db["leads"].update_one(
        {"_id": ObjectId(id)}, {"$set": lead_dict}
    )
    if update_result.modified_count == 1 or update_result.matched_count == 1:
        updated_lead = await db["leads"].find_one({"_id": ObjectId(id)})
        return lead_helper(updated_lead)
    raise HTTPException(status_code=404, detail="Lead not found")

@router.delete("/{id}")
async def delete_lead(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    delete_result = await db["leads"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Lead not found")
