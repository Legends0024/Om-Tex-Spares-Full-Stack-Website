from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict
from database import get_database
from models.deal import DealIn, DealOut
from auth import get_current_admin
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/deals", tags=["deals"])

def deal_helper(deal) -> dict:
    deal["id"] = str(deal["_id"])
    del deal["_id"]
    return deal

@router.get("/", response_model=List[DealOut])
async def get_all_deals(admin: dict = Depends(get_current_admin)):
    db = get_database()
    deals = await db["deals"].find().sort("created_at", -1).to_list(1000)
    return [deal_helper(d) for d in deals]

@router.get("/stats")
async def get_deal_stats(admin: dict = Depends(get_current_admin)):
    db = get_database()
    deals = await db["deals"].find().to_list(5000)
    
    total_value = sum(d["value"] for d in deals)
    won_value = sum(d["value"] for d in deals if d["stage"] == "Won")
    
    deals_by_stage = {}
    for d in deals:
        stage = d["stage"]
        deals_by_stage[stage] = deals_by_stage.get(stage, 0) + 1
        
    # Mock monthly totals for chart
    monthly_totals = [
        {"month": "Jan", "value": 45000},
        {"month": "Feb", "value": 52000},
        {"month": "Mar", "value": 48000},
        {"month": "Apr", "value": 61000},
        {"month": "May", "value": 55000},
        {"month": "Jun", "value": 67000},
        {"month": "Jul", "value": won_value if won_value > 0 else 72000}
    ]
    
    return {
        "total_value": total_value,
        "won_value": won_value,
        "deals_by_stage": deals_by_stage,
        "monthly_totals": monthly_totals
    }

@router.post("/", response_model=DealOut)
async def create_deal(deal: DealIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    deal_dict = deal.model_dump()
    deal_dict["created_at"] = datetime.utcnow()
    deal_dict["updated_at"] = datetime.utcnow()
    new_deal = await db["deals"].insert_one(deal_dict)
    created_deal = await db["deals"].find_one({"_id": new_deal.inserted_id})
    return deal_helper(created_deal)

@router.put("/{id}", response_model=DealOut)
async def update_deal(id: str, deal: DealIn, admin: dict = Depends(get_current_admin)):
    db = get_database()
    deal_dict = deal.model_dump()
    deal_dict["updated_at"] = datetime.utcnow()
    update_result = await db["deals"].update_one(
        {"_id": ObjectId(id)}, {"$set": deal_dict}
    )
    if update_result.modified_count == 1 or update_result.matched_count == 1:
        updated_deal = await db["deals"].find_one({"_id": ObjectId(id)})
        return deal_helper(updated_deal)
    raise HTTPException(status_code=404, detail="Deal not found")

@router.delete("/{id}")
async def delete_deal(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    delete_result = await db["deals"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Deal not found")
