from pydantic import BaseModel

class AppConfig(BaseModel):
    admin_whatsapp: str
    company_phone: str
    company_email: str
    company_address: str
