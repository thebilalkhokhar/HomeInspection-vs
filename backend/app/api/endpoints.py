from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from app.schemas.quote import QuoteCreate, QuoteResponse
from app.models.quote import Quote, QuoteStatus
from app.db.database import get_db

router = APIRouter()


@router.post(
    "/quotes",
    status_code=status.HTTP_201_CREATED,
    response_model=QuoteResponse,
)
def create_quote(payload: QuoteCreate, db: Session = Depends(get_db)):
    """
    Submit a new quote request.

    Validates the request payload, persists the Quote record with
    a default status of 'pending', and returns the created record.
    """
    try:
        new_quote = Quote(
            client_name=payload.client_name,
            client_email=payload.client_email,
            client_phone=payload.client_phone,
            property_address=payload.property_address,
            property_zip=payload.property_zip,
            square_footage=payload.square_footage,
            property_age_range=payload.property_age_range,
            requested_services=payload.requested_services,
            status=QuoteStatus.pending,
        )
        db.add(new_quote)
        db.commit()
        db.refresh(new_quote)
        return new_quote

    except OperationalError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable. Please check DATABASE_URL and PostgreSQL availability.",
        )
    except Exception:
        db.rollback()
        raise
