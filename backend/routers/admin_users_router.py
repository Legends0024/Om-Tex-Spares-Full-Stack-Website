from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import get_database
from models.admin_user import AdminUserIn, AdminUserOut
from auth import get_current_admin, hash_password
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/admin-users", tags=["admin-users"])

def user_helper(user) -> dict:
    user["id"] = str(user["_id"])
    # We don't delete _id because Pydantic might need it, but we return a copy
    res = user.copy()
    if "password_hash" in res:
        del res["password_hash"]
    del res["_id"]
    return res

@router.get("/", response_model=List[AdminUserOut])
async def get_all_users(admin: dict = Depends(get_current_admin)):
    if admin["role"] != "super_admin":
        raise HTTPException(status_code=403, detail="Super Admin access required")
    db = get_database()
    users = await db["admin_users"].find().to_list(100)
    return [user_helper(u) for u in users]

@router.get("/me", response_model=AdminUserOut)
async def get_me(admin: dict = Depends(get_current_admin)):
    db = get_database()
    user = await db["admin_users"].find_one({"username": admin["username"]})
    if user:
        return user_helper(user)
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/", response_model=AdminUserOut)
async def create_user(user: AdminUserIn, admin: dict = Depends(get_current_admin)):
    if admin["role"] != "super_admin":
        raise HTTPException(status_code=403, detail="Super Admin access required")
    db = get_database()
    
    existing = await db["admin_users"].find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
        
    user_dict = user.model_dump()
    if not user.password:
        raise HTTPException(status_code=400, detail="Password is required for new users")
        
    user_dict["password_hash"] = hash_password(user.password)
    del user_dict["password"]
    user_dict["created_at"] = datetime.utcnow()
    user_dict["last_login"] = None
    
    new_user = await db["admin_users"].insert_one(user_dict)
    created_user = await db["admin_users"].find_one({"_id": new_user.inserted_id})
    return user_helper(created_user)

@router.put("/{id}", response_model=AdminUserOut)
async def update_user(id: str, user: AdminUserIn, admin: dict = Depends(get_current_admin)):
    if admin["role"] != "super_admin":
        raise HTTPException(status_code=403, detail="Super Admin access required")
    db = get_database()
    
    update_data = user.model_dump(exclude={"password"})
    if user.password:
        update_data["password_hash"] = hash_password(user.password)
        
    update_result = await db["admin_users"].update_one(
        {"_id": ObjectId(id)}, {"$set": update_data}
    )
    if update_result.modified_count == 1 or update_result.matched_count == 1:
        updated_user = await db["admin_users"].find_one({"_id": ObjectId(id)})
        return user_helper(updated_user)
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/{id}")
async def delete_user(id: str, admin: dict = Depends(get_current_admin)):
    if admin["role"] != "super_admin":
        raise HTTPException(status_code=403, detail="Super Admin access required")
    
    db = get_database()
    user_to_delete = await db["admin_users"].find_one({"_id": ObjectId(id)})
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
        
    if user_to_delete["username"] == admin["username"]:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
        
    await db["admin_users"].delete_one({"_id": ObjectId(id)})
    return {"status": "deleted"}
