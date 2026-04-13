from fastapi import APIRouter, Depends, HTTPException
from typing import List
from database import get_database
from models.access_entry import AccessEntryIn, AccessEntryOut
from auth import get_current_admin
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/access", tags=["access"])

def access_helper(entry) -> dict:
    entry["id"] = str(entry["_id"])
    del entry["_id"]
    return entry

@router.get("/", response_model=List[AccessEntryOut])
async def get_access_entries(admin: dict = Depends(get_current_admin)):
    db = get_database()
    entries = await db["access_entries"].find().sort("granted_at", -1).to_list(1000)
    return [access_helper(e) for e in entries]

@router.post("/", response_model=AccessEntryOut)
async def create_access_entry(entry: AccessEntryIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    entry_dict = entry.model_dump()
    entry_dict["granted_at"] = datetime.utcnow()
    entry_dict["whatsapp_link"] = f"https://wa.me/{entry_dict['phone']}"
    new_entry = await db["access_entries"].insert_one(entry_dict)
    created_entry = await db["access_entries"].find_one({"_id": new_entry.inserted_id})
    return access_helper(created_entry)

@router.delete("/{id}")
async def delete_access_entry(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    delete_result = await db["access_entries"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Access entry not found")
