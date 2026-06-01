# Home Inspection Platform - Backend API

A FastAPI-based REST API backend for the Home Inspection platform with PostgreSQL database integration, Alembic migrations, and async email notifications.

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints.py          # API route handlers
│   ├── core/
│   │   └── __init__.py           # App-level configuration
│   ├── db/
│   │   ├── __init__.py
│   │   └── database.py           # SQLAlchemy setup, Base, SessionLocal, get_db
│   ├── models/
│   │   ├── __init__.py
│   │   ├── agent.py              # Agent SQLAlchemy model
│   │   └── quote.py              # Quote SQLAlchemy model
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── quote.py              # Pydantic models for validation
│   ├── services/
│   │   ├── __init__.py
│   │   └── email_service.py      # Async email notification service
│   ├── __init__.py
│   └── main.py                    # FastAPI app initialization
├── alembic/
│   ├── versions/
│   │   └── 001_initial.py        # Initial migration (agents & quotes tables)
│   ├── env.py                     # Alembic environment configuration
│   ├── script.py.mako
│   └── README
├── .env.example                   # Environment variable template
├── alembic.ini                    # Alembic configuration
├── requirements.txt               # Python dependencies
└── .venv/                         # Virtual environment
```

## Setup Instructions

### 1. Prerequisites

- Python 3.11+
- PostgreSQL 12+
- pip (Python package manager)

### 2. Create and Activate Virtual Environment

```powershell
# Create virtual environment
python -m venv .venv

# Activate on Windows
.\.venv\Scripts\Activate.ps1

# Activate on macOS/Linux
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Copy `.env.example` to `.env` and update with your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
DATABASE_URL=postgresql://user:password@localhost:5432/home_inspection
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
MAIL_FROM_NAME=Home Inspection Platform
```

**Note**: For Gmail, you'll need an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### 5. Database Migrations

Run Alembic migrations to set up the database schema:

```bash
alembic upgrade head
```

To create new migrations after schema changes:

```bash
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

## Running the Application

### Start Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- **Base URL**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

## API Endpoints

### POST `/api/v1/quotes`

Create a new quote submission.

**Request Body** (JSON):

```json
{
  "client_name": "John Doe",
  "client_email": "john@example.com",
  "client_phone": "555-123-4567",
  "property_address": "123 Main Street",
  "property_zip": "12345",
  "square_footage": 2500,
  "property_age_range": "10-20",
  "requested_services": ["roof", "plumbing", "electrical"],
  "agent_name": "Jane Smith",
  "agent_email": "jane@homeinspection.com"
}
```

**Response** (201 Created):

```json
{
  "message": "Quote received and saved successfully",
  "id": "qut-a1b2c3d4",
  "client_name": "John Doe",
  "client_email": "john@example.com",
  "property_address": "123 Main Street",
  "property_zip": "12345",
  "square_footage": 2500,
  "requested_services": ["roof", "plumbing", "electrical"],
  "status": "pending",
  "created_at": "2026-06-01T12:34:56",
  "agent_id": "agt-1a2b3c4d"
}
```

**Validation**:

- `client_email` and `agent_email` (if provided) must be valid email addresses
- All required fields must be present
- `square_footage` must be a positive integer
- `requested_services` must be a non-empty list of strings

## Database Models

### Agent

- `id` (Primary Key, string)
- `name` (String)
- `email` (String, Unique)
- `phone` (String)
- `created_at` (DateTime)
- Relationship: One-to-Many with Quote

### Quote

- `id` (Primary Key, string)
- `client_name` (String)
- `client_email` (String)
- `client_phone` (String)
- `property_address` (String)
- `property_zip` (String)
- `square_footage` (Integer)
- `property_age_range` (String)
- `requested_services` (JSON Array)
- `agent_id` (Foreign Key → Agent, string)
- `status` (String, default: "pending")
- `created_at` (DateTime)
- Relationship: Many-to-One with Agent

## Email Notifications

When a quote is submitted with agent information:

1. The system checks if the agent exists in the database
2. If not, a new agent record is created
3. The quote is saved to the database
4. An async email notification is sent to the agent with a formatted HTML summary
5. Email sending failures do not block the API response

## Development Notes

- **Async Email**: Email sending is non-blocking using `fastapi-mail` and async/await
- **Database Sessions**: SQLAlchemy sessions are managed per-request using FastAPI dependencies
- **CORS**: Middleware is configured to allow all origins (adjust in production)
- **Error Handling**: Email failures are logged but don't prevent quote submission

## Testing the API Locally

Using curl:

```bash
curl -X POST "http://localhost:8000/api/v1/quotes" \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test User",
    "client_email": "test@example.com",
    "client_phone": "555-0000",
    "property_address": "456 Test Ave",
    "property_zip": "54321",
    "square_footage": 1800,
    "property_age_range": "0-10",
    "requested_services": ["inspection"],
    "agent_name": "Test Agent",
    "agent_email": "agent@example.com"
  }'
```

Using Python:

```python
import requests

response = requests.post(
    "http://localhost:8000/api/v1/quotes",
    json={
        "client_name": "Test User",
        "client_email": "test@example.com",
        "client_phone": "555-0000",
        "property_address": "456 Test Ave",
        "property_zip": "54321",
        "square_footage": 1800,
        "property_age_range": "0-10",
        "requested_services": ["inspection"],
        "agent_name": "Test Agent",
        "agent_email": "agent@example.com"
    }
)

print(response.status_code)
print(response.json())
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running on localhost:5432
- Verify credentials in `.env` file
- Check that the database exists (create if needed)

### Email Not Sending

- Check SMTP credentials in `.env`
- Verify Gmail app password is set (not regular password)
- Check firewall/network settings for port 587

### Migration Issues

- Run `alembic current` to check current revision
- Run `alembic history` to see all migrations
- Use `alembic downgrade -1` to rollback last migration

## Production Deployment

Before deploying to production:

1. Update CORS origins to specific domains
2. Set `DEBUG=False`
3. Use environment variables for all secrets
4. Enable database SSL connections
5. Use a production ASGI server (Gunicorn, etc.)
6. Implement rate limiting and authentication
7. Add request logging and monitoring

## License

Proprietary - Home Inspection Platform
