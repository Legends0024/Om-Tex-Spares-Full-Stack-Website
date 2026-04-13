from pydantic import BaseModel
from datetime import datetime
from typing import Literal, Optional, List

class DealIn(BaseModel):
    title: str
    customer_id: str
    customer_name: str
    stage: Literal["Inquiry", "Quoted", "Negotiation", "Won", "Lost"]
    value: float
    product_names: List[str]
    notes: str = ""

class DealOut(DealIn):
    id: str
    created_at: datetime
    updated_at: datetime
