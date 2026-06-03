# Home Inspection — Backend API

FastAPI + SQLAlchemy + PostgreSQL REST API with JWT cookie-based authentication.

## Tech Stack

- **Framework**: FastAPI 0.115
- **ORM**: SQLAlchemy 2.0
- **Database**: PostgreSQL
- **Migrations**: Alembic
- **Auth**: PyJWT + bcrypt (HttpOnly cookie)
- **Validation**: Pydantic v2

## Getting Started

### 1. Prerequisites

- Python 3.11+
- PostgreSQL 12+

### 2. Setup

```bash
python -m venv .venv

# Windows
.\.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### 3. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/home_inspection
JWT_SECRET_KEY=your-strong-random-secret
ACCESS_TOKEN_EXPIRE_DAYS=30
```

Generate a strong secret:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 4. Database

```bash
alembic upgrade head
```

### 5. Create Admin User

```python
from app.db.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password

db = SessionLocal()
db.add(User(email="admin@example.com", hashed_password=hash_password("your-password")))
db.commit()
db.close()
```

### 6. Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **API**: `http://localhost:8000`
- **Swagger docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py               # POST /auth/login, POST /auth/logout
│   │   └── endpoints.py          # Quotes + Contact endpoints
│   ├── core/
│   │   ├── dependencies.py       # get_current_user JWT dependency
│   │   ├── security.py           # hash_password, verify_password, JWT utils
│   │   └── utils.py              # generate_prefixed_id
│   ├── db/
│   │   └── database.py           # SQLAlchemy engine, SessionLocal, Base, get_db
│   ├── models/
│   │   ├── contact.py            # ContactMessage model
│   │   ├── quote.py              # Quote model + QuoteStatus enum
│   │   └── user.py               # User model
│   ├── schemas/
│   │   ├── contact.py            # ContactCreate, ContactResponse
│   │   ├── quote.py              # QuoteCreate, QuoteStatusUpdate, QuoteResponse
│   │   └── user.py               # UserLogin, UserResponse
│   └── main.py                   # FastAPI app, CORS, router registration
├── alembic/
│   ├── versions/
│   │   ├── 0001_initial.py       # quotes + contact_messages + quotestatus enum
│   │   └── 0002_create_users_table.py
│   └── env.py
├── .env.example
├── alembic.ini
└── requirements.txt
```

## API Reference

### Public Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/v1/quotes` | Submit a quote request |
| `POST` | `/api/v1/contact` | Submit a contact message |
| `POST` | `/api/v1/auth/login` | Login — sets HttpOnly JWT cookie |
| `POST` | `/api/v1/auth/logout` | Logout — clears JWT cookie |

### Protected Endpoints (JWT cookie required)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/v1/quotes` | List quotes (paginated, filterable by status) |
| `GET` | `/api/v1/quotes/count` | Total quote count (filterable) |
| `PATCH` | `/api/v1/quotes/{id}` | Update quote status |
| `GET` | `/api/v1/contact` | List contact messages (paginated) |
| `GET` | `/api/v1/contact/count` | Total message count |

### Pagination Query Params

```
GET /api/v1/quotes?skip=0&limit=12&status_filter=pending
GET /api/v1/contact?skip=0&limit=12
```

### Quote Status Values

```
pending → viewed → contacted
```

## Authentication Flow

1. `POST /api/v1/auth/login` with `{ email, password }`
2. Backend verifies credentials, generates JWT, sets `access_token` HttpOnly cookie
3. Subsequent protected requests automatically include the cookie
4. `POST /api/v1/auth/logout` clears the cookie

## Database Models

### Quote

| Column | Type | Notes |
|--------|------|-------|
| `id` | String(32) | Prefixed: `qut-` |
| `client_name` | String(255) | |
| `client_email` | String(255) | Indexed |
| `client_phone` | String(20) | |
| `property_address` | String(500) | |
| `property_zip` | String(10) | |
| `square_footage` | Integer | |
| `property_age_range` | String(50) | |
| `requested_services` | JSON | Array of strings |
| `status` | Enum | `pending` / `viewed` / `contacted` |
| `created_at` | DateTime | UTC |

### ContactMessage

| Column | Type | Notes |
|--------|------|-------|
| `id` | String(32) | Prefixed: `msg-` |
| `name` | String(255) | |
| `email` | String(255) | Indexed |
| `phone` | String(20) | Nullable |
| `subject` | String(255) | Nullable |
| `message` | Text | |
| `created_at` | DateTime | UTC |

### User

| Column | Type | Notes |
|--------|------|-------|
| `id` | String(32) | Prefixed: `usr-` |
| `email` | String(255) | Unique, indexed |
| `hashed_password` | String(255) | bcrypt |
| `created_at` | DateTime | UTC |

## Migrations

```bash
# Apply all migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "description"

# Rollback one step
alembic downgrade -1

# Check current revision
alembic current
```

## Production Checklist

- [ ] Set `JWT_SECRET_KEY` to a strong random value
- [ ] Restrict CORS `allow_origins` to your frontend domain
- [ ] Use `secure=True` on cookies (requires HTTPS)
- [ ] Run behind Gunicorn: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker`
- [ ] Enable PostgreSQL SSL
- [ ] Set up database backups
