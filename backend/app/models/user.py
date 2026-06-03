from datetime import datetime

from sqlalchemy import Column, String, DateTime
from app.db.database import Base
from app.core.utils import generate_prefixed_id


class User(Base):
    __tablename__ = "users"

    id = Column(
        String(32),
        primary_key=True,
        index=True,
        default=lambda: generate_prefixed_id("usr-"),
    )
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email})>"
