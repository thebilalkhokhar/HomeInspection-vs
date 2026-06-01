from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.core.utils import generate_prefixed_id


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(String(32), primary_key=True, index=True, default=lambda: generate_prefixed_id("qut-"))
    client_name = Column(String(255), nullable=False)
    client_email = Column(String(255), nullable=False, index=True)
    client_phone = Column(String(20), nullable=False)
    property_address = Column(String(500), nullable=False)
    property_zip = Column(String(10), nullable=False)
    square_footage = Column(Integer, nullable=False)
    property_age_range = Column(String(50), nullable=False)
    requested_services = Column(JSON, nullable=False, default=list)
    agent_id = Column(String(32), ForeignKey("agents.id"), nullable=True, index=True)
    status = Column(String(50), default="pending", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationship to Agent
    agent = relationship("Agent", back_populates="quotes")

    def __repr__(self):
        return f"<Quote(id={self.id}, client_name={self.client_name}, status={self.status})>"
