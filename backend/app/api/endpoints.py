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
from app.schemas.quote import QuoteCreate, QuoteResponse, QuoteStatusUpdate

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
    skip: int = 0,
    limit: int = 12,
    status_filter: str = "all",
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Return paginated quote submissions — admin only."""
    query = db.query(Quote)
    if status_filter != "all":
        try:
            query = query.filter(Quote.status == QuoteStatus(status_filter))
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid status: {status_filter}")
    return query.order_by(Quote.created_at.desc()).offset(skip).limit(limit).all()


@router.get(
    "/quotes/count",
    dependencies=[Depends(get_current_user)],
)
def count_quotes(
    status_filter: str = "all",
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Return total quote count (optionally filtered by status) — admin only."""
    query = db.query(Quote)
    if status_filter != "all":
        try:
            query = query.filter(Quote.status == QuoteStatus(status_filter))
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid status: {status_filter}")
    return {"total": query.count()}


@router.get(
    "/contact",
    response_model=List[ContactResponse],
    dependencies=[Depends(get_current_user)],
)
def list_contact_messages(
    skip: int = 0,
    limit: int = 12,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Return paginated contact messages — admin only."""
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()


@router.get(
    "/contact/count",
    dependencies=[Depends(get_current_user)],
)
def count_contact_messages(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Return total contact message count — admin only."""
    return {"total": db.query(ContactMessage).count()}


@router.patch(
    "/quotes/{quote_id}",
    response_model=QuoteResponse,
    dependencies=[Depends(get_current_user)],
)
def update_quote_status(
    quote_id: str,
    payload: QuoteStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Update the status of a quote — admin only."""
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quote {quote_id} not found.",
        )
    quote.status = payload.status  # type: ignore[assignment]
    db.commit()
    db.refresh(quote)
    return quote
