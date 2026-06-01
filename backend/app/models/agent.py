from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.core.utils import generate_prefixed_id


class Agent(Base):
    __tablename__ = "agents"

    id = Column(String(32), primary_key=True, index=True, default=lambda: generate_prefixed_id("agt-"))
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True, index=True)
    phone = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationship to Quote
    quotes = relationship("Quote", back_populates="agent", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Agent(id={self.id}, name={self.name}, email={self.email})>"
