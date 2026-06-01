from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from app.schemas.quote import QuoteCreate, QuoteResponse
from app.models.agent import Agent
from app.models.quote import Quote
from app.db.database import get_db
from app.services.email_service import send_quote_notification

router = APIRouter()


@router.post("/quotes", status_code=status.HTTP_201_CREATED, response_model=QuoteResponse)
async def create_quote(payload: QuoteCreate, db: Session = Depends(get_db)):
    """
    Create a new quote submission.
    
    - Validates the request payload (FastAPI/Pydantic handles this)
    - Creates or finds the agent if provided
    - Saves the quote to the database
    - Sends an email notification to the agent
    - Returns the saved quote with 201 Created status
    """
    
    try:
        agent = None
        agent_email = None

        if payload.agent_email and payload.agent_name:
            agent = db.query(Agent).filter(Agent.email == payload.agent_email).first()

            if not agent:
                agent = Agent(
                    name=payload.agent_name,
                    email=payload.agent_email,
                    phone=payload.client_phone,
                )
                db.add(agent)
                db.commit()
                db.refresh(agent)

            agent_email = agent.email

        new_quote = Quote(
            client_name=payload.client_name,
            client_email=payload.client_email,
            client_phone=payload.client_phone,
            property_address=payload.property_address,
            property_zip=payload.property_zip,
            square_footage=payload.square_footage,
            property_age_range=payload.property_age_range,
            requested_services=payload.requested_services,
            agent_id=agent.id if agent else None,
            status="pending",
        )
        db.add(new_quote)
        db.commit()
        db.refresh(new_quote)

        if agent_email:
            await send_quote_notification(
                quote_data=payload,
                recipient_email=agent_email,
                quote_id=new_quote.id,
            )

        return QuoteResponse(
            id=new_quote.id,
            client_name=new_quote.client_name,
            client_email=new_quote.client_email,
            client_phone=new_quote.client_phone,
            property_address=new_quote.property_address,
            property_zip=new_quote.property_zip,
            square_footage=new_quote.square_footage,
            requested_services=new_quote.requested_services,
            status=new_quote.status,
            created_at=new_quote.created_at,
            agent_id=new_quote.agent_id,
        )
    except OperationalError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable. Please check DATABASE_URL and PostgreSQL availability.",
        )
    except Exception:
        db.rollback()
        raise
