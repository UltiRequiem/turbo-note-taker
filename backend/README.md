# Backend - Django REST API

This directory contains the Django REST Framework backend that serves as the API server for the notes application.

## 📁 Directory Structure

```
backend/
├── notes/                  # Main Django app
│   ├── migrations/         # Database migration files
│   ├── __init__.py
│   ├── admin.py           # Django admin configuration
│   ├── apps.py            # App configuration
│   ├── auth_views.py      # Authentication endpoints
│   ├── models.py          # Database models (User, Note, Category)
│   ├── serializers.py     # DRF serializers for API
│   ├── tests.py           # Unit tests
│   ├── urls.py            # URL routing for notes app
│   └── views.py           # API view controllers
├── notes_backend/         # Django project settings
│   ├── __init__.py
│   ├── asgi.py            # ASGI configuration
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL routing
│   └── wsgi.py            # WSGI configuration
├── db.sqlite3             # SQLite database file
├── main.py                # Alternative entry point
├── manage.py              # Django management script
├── pyproject.toml         # Python dependencies (uv)
├── server.log             # Server logs
└── uv.lock                # Dependency lock file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- uv (Python package manager)

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
uv sync

# Activate virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### API Documentation
Once the server is running, access the interactive API documentation:
- **Swagger UI**: `http://localhost:8000/api/docs/` - Interactive API testing
- **ReDoc**: `http://localhost:8000/api/redoc/` - Beautiful documentation
- **OpenAPI Schema**: `http://localhost:8000/api/schema/` - Raw API specification

### Alternative Start Method

```bash
# Using main.py
python main.py
```

## 📊 Database Models

### User
- Built-in Django User model
- Handles authentication and user management

### Category
- `id`: Primary key
- `user`: Foreign key to User
- `name`: Category name
- `color`: Hex color code
- `created_at`, `updated_at`: Timestamps

### Note
- `id`: Primary key
- `user`: Foreign key to User
- `category`: Foreign key to Category (nullable)
- `title`: Note title
- `content`: Note content
- `priority`: Priority level
- `is_pinned`: Boolean flag
- `is_archived`: Boolean flag
- `tags`: JSON field for tags
- `created_at`, `updated_at`: Timestamps

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/login/` - User login (returns JWT tokens)
- `POST /api/auth/refresh/` - Refresh JWT token

### Notes
- `GET /api/notes/` - List user's notes
- `POST /api/notes/` - Create new note
- `GET /api/notes/{id}/` - Get specific note
- `PUT /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note

### Categories
- `GET /api/categories/` - List user's categories
- `POST /api/categories/` - Create new category
- `PUT /api/categories/{id}/` - Update category
- `DELETE /api/categories/{id}/` - Delete category

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **User Isolation**: All data filtered by authenticated user
- **CORS Configuration**: Configured for frontend domain
- **Input Validation**: Comprehensive validation via DRF serializers
- **Password Security**: Django's built-in password hashing

## 🧪 Testing

```bash
# Run all tests
python manage.py test

# Run tests with coverage
python -m pytest --cov=notes

# Run specific test file
python manage.py test notes.tests
```

## 🛠️ Development

### Database Operations

```bash
# Make migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Shell access
python manage.py shell

# Database shell
python manage.py dbshell
```

### Admin Interface

Access Django admin at `http://localhost:8000/admin/` with superuser credentials.

### Environment Variables

Create `.env` file in backend directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📝 Key Files Explained

- **`models.py`**: Database schema definitions
- **`serializers.py`**: JSON serialization/deserialization logic
- **`views.py`**: API endpoint handlers using DRF ViewSets
- **`auth_views.py`**: Custom authentication endpoints
- **`settings.py`**: Django configuration
- **`urls.py`**: URL routing and API endpoint mapping

## 🔍 Debugging

### Logs
- Server logs: `server.log`
- Django logs: Check console output
- Database queries: Enable `DEBUG = True` in settings

### Common Issues

1. **Port already in use**: Kill process on port 8000
2. **Migration errors**: Delete `db.sqlite3` and run `migrate` again
3. **Import errors**: Ensure virtual environment is activated
4. **CORS issues**: Check `CORS_ALLOWED_ORIGINS` in settings

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [uv Documentation](https://docs.astral.sh/uv/)