from pydantic import BaseModel
from datetime import datetime

class AccessEntryIn(BaseModel):
    name: str
    phone: str
    note: str = ""

class AccessEntryOut(AccessEntryIn):
    id: str
    whatsapp_link: str
    granted_at: datetime
