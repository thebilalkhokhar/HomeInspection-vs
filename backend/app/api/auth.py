import os
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=UserResponse)
def login(payload: UserLogin, response: Response, db: Session = Depends(get_db)):
    """
    Authenticate with email + password.

    On success:
      - Sets a secure HttpOnly JWT cookie named 'access_token'.
      - Returns the sanitised UserResponse (no password).

    On failure:
      - Raises 401 Unauthorized (intentionally vague to prevent user enumeration).
    """
    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": user.email})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=os.getenv("COOKIE_SECURE", "true").lower() == "true",
        samesite="lax",
        max_age=60 * 60 * 24 * 30,
    )

    return user


@router.post("/logout")
def logout(response: Response):
    """
    Clear the authentication cookie, effectively logging the user out.
    """
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,
        samesite="lax",
    )
    return {"detail": "Successfully logged out."}
