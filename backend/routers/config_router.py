from fastapi import APIRouter, Depends
from database import get_database
from models.app_config import AppConfig
from auth import get_current_admin

router = APIRouter(prefix="/config", tags=["config"])

@router.get("/", response_model=AppConfig)
async def get_config():
    db = get_database()
    config = await db["config"].find_one()
    if config:
        # Pydantic will ignore _id if not in model
        return config
    # Fallback if config is missing (seed should handle this)
    return {
        "admin_whatsapp": "918222085999",
        "company_phone": "+91 82220 85999",
        "company_email": "omtexspares@gmail.com",
        "company_address": "17, New Subzi Mandi, Near GVM School, PANIPAT-132103"
    }

@router.put("/", response_model=AppConfig)
async def update_config(config: AppConfig, admin: dict = Depends(get_current_admin)):
    db = get_database()
    config_dict = config.model_dump()
    await db["config"].update_one({}, {"$set": config_dict}, upsert=True)
    updated_config = await db["config"].find_one()
    return updated_config
