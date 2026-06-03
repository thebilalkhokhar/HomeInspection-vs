from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
import jwt

from app.core.security import decode_access_token
from app.db.database import get_db
from app.models.user import User


def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
) -> User:
    """
    FastAPI dependency that enforces JWT cookie authentication.

    Extracts the 'access_token' cookie, decodes it, and returns
    the corresponding User ORM object.

    Raises HTTP 401 if:
      - The cookie is missing
      - The token is expired or malformed
      - The email claim does not match any user in the database
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token: str | None = request.cookies.get("access_token")
    if not token:
        raise credentials_exception

    try:
        payload = decode_access_token(token)
        email: str | None = payload.get("sub")
        if not email:
            raise credentials_exception
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise credentials_exception

    return user
