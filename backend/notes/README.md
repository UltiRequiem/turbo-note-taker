# Notes Django App

This directory contains the main Django application that handles notes and categories functionality.

## 📁 File Structure

```
notes/
├── migrations/         # Database migration files
├── __init__.py        # Python package marker
├── admin.py           # Django admin interface configuration
├── apps.py            # App configuration
├── auth_views.py      # Authentication endpoints (signup, profile)
├── models.py          # Database models (Category, Note)
├── serializers.py     # DRF serializers for API responses
├── tests.py           # Unit tests
├── urls.py            # URL routing for the app
└── views.py           # API viewsets and business logic
```

## 🔧 Core Components

### Models (`models.py`)
Defines the database schema:
- **Category**: User-specific categories with colors and names
- **Note**: Notes with title, content, category assignment, and metadata

### ViewSets (`views.py`)
API endpoints using Django REST Framework:
- **CategoryViewSet**: CRUD operations for categories
- **NoteViewSet**: CRUD operations for notes with advanced filtering

### Serializers (`serializers.py`)
Data serialization for API responses:
- **CategorySerializer**: Category data with notes count
- **NoteSerializer**: Complete note data with computed fields
- **NoteListSerializer**: Optimized serializer for list views

### Authentication (`auth_views.py`)
Custom authentication endpoints:
- **SignupView**: User registration with default categories
- **ProfileView**: User profile information

## 🔐 Security Features

### User Isolation
- All queries automatically filtered by authenticated user
- Cross-user data access prevention
- Permission validation on all operations

### Input Validation
- Model-level validation for data integrity
- Serializer validation for API requests
- Custom validation methods for business rules

## 📊 Database Design

### Category Model
```python
- user: ForeignKey to User
- name: CharField (max 100, unique per user)
- color: CharField (hex color code)
- timestamps: created_at, updated_at
```

### Note Model
```python
- user: ForeignKey to User
- category: ForeignKey to Category (nullable)
- title: CharField (max 200)
- content: TextField
- priority: CharField (choices: low, medium, high)
- is_pinned: BooleanField
- is_archived: BooleanField
- tags: TextField (comma-separated)
- timestamps: created_at, updated_at
```

## 🎯 API Features

### Advanced Filtering
- Search across title, content, and tags
- Filter by category, priority, pin status, archive status
- Tag-based filtering with comma-separated values
- Custom ordering options

### Custom Actions
- **toggle_pin**: Pin/unpin notes for priority display
- **toggle_archive**: Archive/unarchive notes
- **archived**: Get all archived notes
- **pinned**: Get all pinned notes
- **stats**: User statistics dashboard

## 🧪 Testing

### Test Coverage
- Model validation and constraints
- ViewSet functionality and permissions
- Serializer data transformation
- Authentication and authorization
- Edge cases and error handling

### Running Tests
```bash
cd backend
uv run python manage.py test notes
```

## 🔗 URL Configuration

### API Endpoints
- `/api/notes/` - Notes CRUD and filtering
- `/api/categories/` - Categories CRUD
- `/api/auth/signup/` - User registration
- `/api/auth/profile/` - User profile

### Custom Actions
- `/api/notes/{id}/toggle_pin/` - Pin/unpin note
- `/api/notes/{id}/toggle_archive/` - Archive/unarchive note
- `/api/notes/archived/` - List archived notes
- `/api/notes/pinned/` - List pinned notes
- `/api/notes/stats/` - User statistics

## 📋 Admin Interface

### Django Admin Integration
- Category management with color preview
- Note management with rich text editing
- User management and permissions
- Database inspection and debugging tools

### Access Admin
```bash
# Create superuser
uv run python manage.py createsuperuser

# Access at http://localhost:8000/admin/
```

## 🚀 Development

### Key Development Patterns
- **User Context**: All operations respect user isolation
- **Optimistic Queries**: Efficient database queries with select_related
- **Validation Layers**: Multiple validation levels for data integrity
- **Error Handling**: Comprehensive error responses and logging

### Adding New Features
1. Update models if schema changes needed
2. Create/update serializers for new fields
3. Add ViewSet methods or custom actions
4. Include URL patterns
5. Add comprehensive tests
6. Update API documentation

This Django app provides a robust foundation for the notes application with proper security, scalability, and maintainability practices.