# Complete Django Guide for the Notes App 🐍

This guide explains all the Django concepts used in this notes application, perfect for someone learning Django.

## 📚 Table of Contents

1. [Django Project Structure](#django-project-structure)
2. [Models - Database Design](#models---database-design)
3. [Django REST Framework](#django-rest-framework)
4. [Authentication & JWT](#authentication--jwt)
5. [Views & ViewSets](#views--viewsets)
6. [URL Routing](#url-routing)
7. [Admin Interface](#admin-interface)
8. [Migrations](#migrations)
9. [Settings Configuration](#settings-configuration)
10. [Common Django Commands](#common-django-commands)

---

## 🏗 Django Project Structure

```
backend/
├── notes_backend/          # Django PROJECT (main settings)
│   ├── __init__.py
│   ├── settings.py         # Main configuration file
│   ├── urls.py            # Main URL routing
│   ├── wsgi.py            # Web server interface
│   └── asgi.py            # Async server interface
├── notes/                  # Django APP (functionality)
│   ├── __init__.py
│   ├── models.py          # Database models
│   ├── views.py           # API views/logic
│   ├── urls.py            # App-specific URLs
│   ├── admin.py           # Admin interface config
│   ├── serializers.py     # API serializers
│   ├── auth_views.py      # Authentication views
│   ├── apps.py            # App configuration
│   ├── tests.py           # Unit tests
│   └── migrations/        # Database migrations
├── manage.py              # Django command-line utility
└── db.sqlite3            # SQLite database file
```

### Key Concepts:
- **Project vs App**: A project contains multiple apps. Apps are reusable components.
- **Separation of Concerns**: Each file has a specific purpose
- **manage.py**: Your command-line interface to Django

---

## 🗄 Models - Database Design

Models define your database structure using Python classes.

### `notes/models.py` - Our Database Models

```python
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Category(models.Model):
    # ForeignKey creates a relationship to User
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, default='#3B82F6')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']
        unique_together = ['user', 'name']  # Prevent duplicate names per user

    def __str__(self):
        return f"{self.user.email} - {self.name}"

class Note(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='notes')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    is_pinned = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    tags = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_pinned', '-updated_at']

    def __str__(self):
        return f"{self.user.email} - {self.title}"

    @property
    def tag_list(self):
        """Convert comma-separated tags to list"""
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
```

### Model Field Types Explained:
- **CharField**: Short text (max_length required)
- **TextField**: Long text (no length limit)
- **BooleanField**: True/False values
- **DateTimeField**: Date and time
- **ForeignKey**: Relationship to another model
- **choices**: Predefined options for a field

### Relationships:
- **ForeignKey**: One-to-Many (User has many Notes)
- **on_delete=CASCADE**: Delete related objects when parent is deleted
- **on_delete=SET_NULL**: Set to NULL when parent is deleted
- **related_name**: Access reverse relationship (user.notes.all())

---

## 🔌 Django REST Framework

Django REST Framework (DRF) turns Django models into APIs.

### `notes/serializers.py` - Data Transformation

```python
from rest_framework import serializers
from .models import Note, Category

class CategorySerializer(serializers.ModelSerializer):
    notes_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'notes_count', 'created_at', 'updated_at']

    def get_notes_count(self, obj):
        """Custom field: count non-archived notes"""
        return obj.notes.filter(is_archived=False).count()

class NoteSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    tag_list = serializers.ListField(child=serializers.CharField(max_length=50), required=False, write_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'category', 'category_name', 'category_color', 'priority', 'is_pinned', 'is_archived', 'tags', 'tag_list', 'created_at', 'updated_at']

    def create(self, validated_data):
        """Custom create method to handle tag_list"""
        tag_list = validated_data.pop('tag_list', [])
        note = Note.objects.create(**validated_data)
        if tag_list:
            note.set_tags(tag_list)
            note.save()
        return note
```

### Serializer Concepts:
- **ModelSerializer**: Automatically creates fields from model
- **SerializerMethodField**: Custom computed fields
- **read_only=True**: Field only appears in output
- **write_only=True**: Field only accepted in input
- **source**: Get data from related field

---

## 🔐 Authentication & JWT

### JWT Setup in `settings.py`

```python
INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'notes',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# JWT Configuration
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
}
```

### Authentication Views in `notes/auth_views.py`

```python
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow unauthenticated access
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Validation
    if not email or not password:
        return Response({'error': 'Email and password required'}, status=400)

    if User.objects.filter(username=email).exists():
        return Response({'error': 'User already exists'}, status=400)

    # Create user
    user = User.objects.create_user(username=email, email=email, password=password)

    # Create default categories
    default_categories = [
        {'name': 'Random Thoughts', 'color': '#FF6B6B'},
        {'name': 'School', 'color': '#4ECDC4'},
        {'name': 'Personal', 'color': '#45B7D1'},
    ]

    for cat_data in default_categories:
        Category.objects.create(name=cat_data['name'], color=cat_data['color'], user=user)

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': {'id': user.id, 'email': user.email}
    }, status=201)
```

### Key Authentication Concepts:
- **JWT**: JSON Web Tokens for stateless authentication
- **@api_view**: Decorator to create API endpoints
- **@permission_classes**: Control who can access endpoints
- **AllowAny**: Anyone can access (used for signup/login)
- **IsAuthenticated**: Only logged-in users can access

---

## 🎯 Views & ViewSets

ViewSets provide CRUD operations automatically.

### `notes/views.py` - API Logic

```python
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering = ['name']

    def get_queryset(self):
        """Only show current user's categories"""
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Automatically set user when creating"""
        serializer.save(user=self.request.user)

class NoteViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'priority', 'is_pinned', 'is_archived']
    search_fields = ['title', 'content', 'tags']
    ordering = ['-is_pinned', '-updated_at']

    def get_queryset(self):
        """Only show current user's notes"""
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Automatically set user when creating"""
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_pin(self, request, pk=None):
        """Custom action: pin/unpin a note"""
        note = self.get_object()
        note.is_pinned = not note.is_pinned
        note.save()
        return Response({
            'id': note.id,
            'is_pinned': note.is_pinned,
            'message': f'Note {"pinned" if note.is_pinned else "unpinned"}'
        })
```

### ViewSet Features:
- **ModelViewSet**: Provides GET, POST, PUT, PATCH, DELETE automatically
- **get_queryset()**: Filter data for current user
- **perform_create()**: Modify object before saving
- **@action**: Add custom endpoints (like toggle_pin)
- **Filtering**: Built-in search, filtering, ordering

---

## 🛤 URL Routing

URLs map web addresses to views.

### `notes_backend/urls.py` - Main URLs

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin
    path('api/auth/login/', TokenObtainPairView.as_view()),  # Login endpoint
    path('api/auth/refresh/', TokenRefreshView.as_view()),  # Token refresh
    path('', include('notes.urls')),  # Include app URLs
]
```

### `notes/urls.py` - App URLs

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, CategoryViewSet
from .auth_views import signup, user_profile

# DRF Router automatically creates REST URLs
router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('api/auth/signup/', signup),
    path('api/auth/profile/', user_profile),
    path('api/', include(router.urls)),  # /api/notes/, /api/categories/, etc.
]
```

### Generated URLs (by router):
- **GET /api/notes/** - List all notes
- **POST /api/notes/** - Create new note
- **GET /api/notes/1/** - Get specific note
- **PUT /api/notes/1/** - Update note
- **DELETE /api/notes/1/** - Delete note
- **POST /api/notes/1/toggle_pin/** - Custom action

---

## 👨‍💼 Admin Interface

Django admin provides a web interface to manage data.

### `notes/admin.py` - Admin Configuration

```python
from django.contrib import admin
from .models import Note, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color', 'notes_count', 'created_at']  # Table columns
    search_fields = ['name']  # Add search box
    list_filter = ['created_at']  # Add filter sidebar
    ordering = ['name']  # Default ordering

    def notes_count(self, obj):
        """Custom column: count of notes"""
        return obj.notes.count()
    notes_count.short_description = 'Notes Count'

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'priority', 'is_pinned', 'is_archived', 'created_at']
    search_fields = ['title', 'content', 'tags']
    list_filter = ['category', 'priority', 'is_pinned', 'is_archived', 'created_at']
    list_editable = ['is_pinned', 'is_archived', 'priority']  # Edit inline
    ordering = ['-created_at']
```

### Admin Features:
- **list_display**: Choose table columns
- **search_fields**: Add search functionality
- **list_filter**: Add sidebar filters
- **list_editable**: Edit fields without opening detail page
- **Custom methods**: Add computed columns

---

## 🔄 Migrations

Migrations track database schema changes.

### Common Migration Commands:

```bash
# Create migration files (after changing models)
uv run python manage.py makemigrations

# Apply migrations to database
uv run python manage.py migrate

# Show migration status
uv run python manage.py showmigrations

# Show SQL for a migration
uv run python manage.py sqlmigrate notes 0001
```

### Migration Files:
Located in `notes/migrations/` - these track all database changes over time.

---

## ⚙️ Settings Configuration

### `notes_backend/settings.py` - Main Configuration

```python
# Security
SECRET_KEY = 'your-secret-key'
DEBUG = True  # False in production
ALLOWED_HOSTS = []

# Applications
INSTALLED_APPS = [
    'django.contrib.admin',      # Admin interface
    'django.contrib.auth',       # User authentication
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',            # REST API framework
    'rest_framework_simplejwt',  # JWT authentication
    'corsheaders',              # CORS for frontend
    'notes',                    # Our app
]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# CORS (Cross-Origin Resource Sharing)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Next.js frontend
]
```

---

## 🔧 Common Django Commands

### Development:
```bash
# Start development server
uv run python manage.py runserver

# Create superuser (admin)
uv run python manage.py createsuperuser

# Django shell (Python REPL with Django loaded)
uv run python manage.py shell

# Collect static files (production)
uv run python manage.py collectstatic
```

### Database:
```bash
# Create migrations
uv run python manage.py makemigrations

# Apply migrations
uv run python manage.py migrate

# Reset database (development only)
rm db.sqlite3
uv run python manage.py migrate
```

### App Management:
```bash
# Create new app
uv run python manage.py startapp newapp

# Run tests
uv run python manage.py test

# Check for problems
uv run python manage.py check
```

---

## 🎯 Key Django Concepts Summary

### 1. **MVC Pattern**: Django uses Model-View-Template (similar to MVC)
   - **Models**: Database structure
   - **Views**: Business logic
   - **Templates**: HTML (we use React instead)

### 2. **DRY (Don't Repeat Yourself)**: Django automates common tasks
   - Admin interface auto-generated from models
   - URL routing with patterns
   - Form handling and validation

### 3. **Security**: Django includes security by default
   - SQL injection protection
   - CSRF protection
   - XSS protection
   - Password hashing

### 4. **Scalability**: Django grows with your app
   - Database abstraction (PostgreSQL, MySQL, SQLite)
   - Caching framework
   - Middleware system
   - Load balancing support

This Django setup provides a solid foundation for any web application with authentication, API endpoints, admin interface, and database management all configured and ready to use!