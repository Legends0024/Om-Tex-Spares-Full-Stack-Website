from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class EnquiryIn(BaseModel):
    name: str
    company_name: str
    phone: str
    email: str
    message: str
    prefers_whatsapp: bool
    product_no: Optional[str] = None

class EnquiryOut(EnquiryIn):
    id: str
    status: str = "new"
    created_at: datetime
