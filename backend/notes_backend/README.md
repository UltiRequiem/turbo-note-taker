# Django Project Configuration

This directory contains the core Django project configuration files for the notes backend.

## 📁 File Structure

```
notes_backend/
├── __init__.py     # Python package marker
├── asgi.py         # ASGI configuration for async deployment
├── settings.py     # Main Django settings and configuration
├── urls.py         # Root URL routing configuration
└── wsgi.py         # WSGI configuration for traditional deployment
```

## 🔧 Core Configuration Files

### settings.py
Central configuration file containing:
- **Database Configuration**: SQLite setup for development
- **Django Apps**: Installed apps including DRF and notes app
- **Authentication**: JWT configuration with SimpleJWT
- **CORS Settings**: Cross-origin configuration for frontend integration
- **API Documentation**: drf-spectacular configuration for Swagger-like docs
- **Security Settings**: CSRF, CORS, and other security configurations

### urls.py
Root URL routing that includes:
- **Admin Interface**: Django admin at `/admin/`
- **Authentication**: JWT endpoints at `/api/auth/`
- **API Documentation**: Interactive docs at `/api/docs/` and `/api/redoc/`
- **App URLs**: Notes app URLs included from `notes.urls`

### wsgi.py & asgi.py
Deployment configuration files:
- **WSGI**: For traditional synchronous deployment (Gunicorn, uWSGI)
- **ASGI**: For asynchronous deployment (Daphne, Uvicorn)

## 🔐 Security Configuration

### JWT Authentication
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
}
```

### CORS Settings
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend development server
    "http://127.0.0.1:3000",
]
```

### Database Security
- User-specific data isolation
- Parameterized queries via Django ORM
- Input validation and sanitization

## 📊 Database Configuration

### Development Setup
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Production Considerations
- Switch to PostgreSQL for production
- Environment-based configuration
- Connection pooling and optimization

## 🔌 API Configuration

### Django REST Framework
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
```

### API Documentation
```python
SPECTACULAR_SETTINGS = {
    'TITLE': 'Notes Taking App API',
    'DESCRIPTION': 'Comprehensive REST API for personal notes management',
    'VERSION': '1.0.0',
}
```

## 🚀 Deployment Configuration

### Environment Variables
For production deployment, use environment variables:
- `DEBUG`: Set to False in production
- `SECRET_KEY`: Use a secure, random secret key
- `ALLOWED_HOSTS`: Specify allowed hostnames
- `DATABASE_URL`: Production database connection

### Static Files
```python
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
```

### Media Files (if needed)
Configuration for file uploads and media serving

## 🔧 Development Settings

### Debug Configuration
- `DEBUG = True` for development
- Detailed error pages and logging
- Django Debug Toolbar integration (optional)

### Logging Configuration
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

## 📋 Middleware Stack

### Current Middleware
1. **CORS Middleware**: Handle cross-origin requests
2. **Security Middleware**: Basic security headers
3. **Session Middleware**: Session management
4. **Common Middleware**: Common request/response processing
5. **CSRF Middleware**: CSRF protection
6. **Authentication Middleware**: User authentication
7. **Messages Middleware**: Django messages framework
8. **Clickjacking Middleware**: X-Frame-Options header

### Custom Middleware
Add custom middleware for:
- Request logging
- Performance monitoring
- Custom authentication flows
- API rate limiting

## 🔍 URL Routing Structure

### Root URLs (`urls.py`)
```python
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/login/", TokenObtainPairView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),
    path("api/schema/", SpectacularAPIView.as_view()),
    path("api/docs/", SpectacularSwaggerView.as_view()),
    path("api/redoc/", SpectacularRedocView.as_view()),
    path("", include("notes.urls")),
]
```

### URL Namespacing
- API endpoints namespaced under `/api/`
- Documentation endpoints for easy access
- Clean URL structure for REST API

## 🛠️ Configuration Management

### Settings Organization
Consider splitting settings for different environments:
- `settings/base.py`: Common settings
- `settings/development.py`: Development-specific
- `settings/production.py`: Production-specific
- `settings/testing.py`: Test-specific settings

### Environment Configuration
Use environment variables for sensitive settings:
- Database credentials
- Secret keys
- Third-party API keys
- Feature flags

This configuration provides a solid foundation for a production-ready Django REST API with proper security, documentation, and deployment considerations.