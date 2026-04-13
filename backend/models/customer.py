from pydantic import BaseModel
from datetime import datetime
from typing import Literal, Optional

class CustomerIn(BaseModel):
    company_name: str
    primary_contact: str
    email: str
    phone: str
    status: Literal["active", "inactive", "prospect"]
    whatsapp: str = ""
    address: str = ""
    notes: str = ""

class CustomerOut(CustomerIn):
    id: str
    created_at: datetime
    created_by: str
