from typing import List
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.quote import QuoteStatus


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


class QuoteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    client_name: str
    client_email: EmailStr
    client_phone: str
    property_address: str
    property_zip: str
    square_footage: int
    property_age_range: str
    requested_services: List[str]
    status: QuoteStatus
    created_at: datetime
