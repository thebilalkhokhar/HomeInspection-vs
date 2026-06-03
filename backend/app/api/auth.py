import os
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password, hash_password
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
        samesite="none",
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


@router.post("/seed-admin")
def seed_admin(db: Session = Depends(get_db)):
    """
    One-time endpoint to create the admin user in production.
    Protected by SEED_SECRET env var — remove or disable after use.
    """
    seed_secret = os.getenv("SEED_SECRET", "")
    if not seed_secret:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found.",
        )

    admin_email = os.getenv("ADMIN_EMAIL", "")
    admin_password = os.getenv("ADMIN_PASSWORD", "")

    if not admin_email or not admin_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ADMIN_EMAIL and ADMIN_PASSWORD env vars must be set.",
        )

    existing = db.query(User).filter(User.email == admin_email).first()
    if existing:
        return {"detail": f"User {admin_email} already exists."}

    user = User(
        email=admin_email,
        hashed_password=hash_password(admin_password),
    )
    db.add(user)
    db.commit()
    return {"detail": f"Admin user {admin_email} created successfully."}
