from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models.contact import ContactMessage
from app.models.quote import Quote, QuoteStatus
from app.models.user import User
from app.schemas.contact import ContactCreate, ContactResponse
from app.schemas.quote import QuoteCreate, QuoteResponse

router = APIRouter()


# ---------------------------------------------------------------------------
# Public endpoints — no auth required
# ---------------------------------------------------------------------------

@router.post(
    "/quotes",
    status_code=status.HTTP_201_CREATED,
    response_model=QuoteResponse,
)
def create_quote(payload: QuoteCreate, db: Session = Depends(get_db)):
    """Submit a new quote request (public)."""
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
            detail="Database connection unavailable.",
        )
    except Exception:
        db.rollback()
        raise


@router.post(
    "/contact",
    status_code=status.HTTP_201_CREATED,
    response_model=ContactResponse,
)
def create_contact_message(payload: ContactCreate, db: Session = Depends(get_db)):
    """Submit a contact message (public)."""
    try:
        new_message = ContactMessage(
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            subject=payload.subject,
            message=payload.message,
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        return new_message
    except OperationalError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable.",
        )
    except Exception:
        db.rollback()
        raise


# ---------------------------------------------------------------------------
# Protected admin endpoints — JWT cookie required
# ---------------------------------------------------------------------------

@router.get(
    "/quotes",
    response_model=List[QuoteResponse],
    dependencies=[Depends(get_current_user)],
)
def list_quotes(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Return all quote submissions — admin only."""
    return db.query(Quote).order_by(Quote.created_at.desc()).all()


@router.get(
    "/contact",
    response_model=List[ContactResponse],
    dependencies=[Depends(get_current_user)],
)
def list_contact_messages(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Return all contact messages — admin only."""
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
