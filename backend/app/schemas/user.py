from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserLogin(BaseModel):
    """Validates incoming login credentials."""
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Safe public representation of a user — never exposes hashed_password."""
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    created_at: datetime
