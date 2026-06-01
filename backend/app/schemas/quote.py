from typing import List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class QuoteCreate(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    client_name: str
    client_email: EmailStr
    client_phone: str
    property_address: str
    property_zip: str
    square_footage: int
    property_age_range: str
    requested_services: List[str] = Field(min_length=1)
    agent_name: Optional[str] = None
    agent_email: Optional[EmailStr] = None
