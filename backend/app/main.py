import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import router as api_router
from app.api.auth import router as auth_router

app = FastAPI(title="Home Inspection API")

# Allow all origins in development; restrict to frontend domain in production
# Set ALLOWED_ORIGINS env var to a comma-separated list e.g.:
# https://your-app.vercel.app,http://localhost:3000
_raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = [o.strip() for o in _raw_origins.split(",")] if _raw_origins != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
