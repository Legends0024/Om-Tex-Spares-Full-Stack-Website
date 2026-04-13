from pydantic import BaseModel

class AdminUser(BaseModel):
    username: str
    password_hash: str
