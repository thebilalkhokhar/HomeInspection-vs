from datetime import datetime

from sqlalchemy import Column, String, DateTime, Text
from app.db.database import Base
from app.core.utils import generate_prefixed_id


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(
        String(32),
        primary_key=True,
        index=True,
        default=lambda: generate_prefixed_id("msg-"),
    )
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    subject = Column(String(255), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<ContactMessage(id={self.id}, name={self.name}, email={self.email})>"
