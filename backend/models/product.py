from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime

class ProductIn(BaseModel):
    name: str
    brand: Literal["SOMET", "VAMATEX", "SULZER", "BONAS", "STAUBLI", "GENERAL"]
    category: str
    part_number: str
    description: str
    image_url: str = ""
    is_featured: bool = False
    product_no: Optional[int] = None

class ProductOut(ProductIn):
    id: str
    created_at: datetime
