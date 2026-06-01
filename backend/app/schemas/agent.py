from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr


class AgentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    phone: str
    created_at: datetime
