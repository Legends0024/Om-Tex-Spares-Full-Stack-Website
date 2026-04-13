from pydantic import BaseModel
from datetime import datetime
from typing import Literal, Optional

class LeadIn(BaseModel):
    name: str
    company: str
    email: str = ""
    phone: str
    source: Literal["WhatsApp", "Website", "Referral", "Cold Call", "Exhibition"]
    status: Literal["new", "contacted", "qualified", "lost"]
    notes: str = ""
    assigned_to: Optional[str] = None

class LeadOut(LeadIn):
    id: str
    created_at: datetime
