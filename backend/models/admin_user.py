from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Literal, Optional

class AdminUserIn(BaseModel):
    username: str
    password: Optional[str] = None
    full_name: str
    role: Literal["super_admin", "admin", "viewer"]
    email: str
    phone: str = ""
    is_active: bool = True

class AdminUserOut(BaseModel):
    id: str
    username: str
    full_name: str
    role: str
    email: str
    phone: str
    is_active: bool
    last_login: Optional[datetime] = None
    created_at: datetime
