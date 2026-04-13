from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from auth import verify_password, create_access_token
from database import get_database
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    db = get_database()
    user = await db["admin_users"].find_one({"username": request.username})
    
    if not user or not verify_password(request.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={
        "sub": user["username"],
        "role": user["role"],
        "full_name": user["full_name"]
    })
    
    # Update last login
    await db["admin_users"].update_one(
        {"_id": user["_id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
