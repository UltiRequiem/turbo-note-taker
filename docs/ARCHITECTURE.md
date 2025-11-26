# Architecture Documentation

## 🏗️ System Architecture Overview

This notes application follows a modern, scalable architecture with clear
separation of concerns and robust security implementation.

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────────┐  │
│  │   React Pages   │ │   Components    │ │   API Client │  │
│  │                 │ │                 │ │              │  │
│  │ • Dashboard     │ │ • NoteEditor    │ │ • Axios      │  │
│  │ • Auth Pages    │ │ • NotesList     │ │ • JWT Tokens │  │
│  │ • Navigation    │ │ • CategoryMgr   │ │ • Error Hdlg │  │
│  └─────────────────┘ └─────────────────┘ └──────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/JSON API
                          │ JWT Authentication
                          │ CORS Configured
┌─────────────────────────▼───────────────────────────────────┐
│                  Backend (Django)                          │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────────┐  │
│  │   API Layer     │ │  Business Logic │ │   Data Layer │  │
│  │                 │ │                 │ │              │  │
│  │ • REST API      │ │ • User Isolation│ │ • Models     │  │
│  │ • Authentication│ │ • Validation    │ │ • Migrations │  │
│  │ • Serialization │ │ • Permissions   │ │ • Queries    │  │
│  └─────────────────┘ └─────────────────┘ └──────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ ORM
                          │ SQL Queries
┌─────────────────────────▼───────────────────────────────────┐
│            Database (SQLite - Dev & Production)            │
│  ┌─────────────────┐ ┌─────────────────┐ ┌──────────────┐  │
│  │     Users       │ │   Categories    │ │    Notes     │  │
│  │                 │ │                 │ │              │  │
│  │ • Authentication│ │ • User-specific │ │ • Rich Data  │  │
│  │ • Profile Data  │ │ • Color Coding  │ │ • Relations  │  │
│  │ • Security      │ │ • Organization  │ │ • Full-text  │  │
│  └─────────────────┘ └─────────────────┘ └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Security Architecture

### Authentication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │    │   Next.js   │    │   Django    │
│             │    │   Frontend  │    │   Backend   │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       │ 1. Login Form    │                  │
       ├─────────────────►│                  │
       │                  │ 2. POST /auth/login/
       │                  ├─────────────────►│
       │                  │                  │ 3. Validate
       │                  │                  │    Credentials
       │                  │                  │
       │                  │ 4. JWT Tokens    │
       │                  │◄─────────────────┤
       │ 5. Store Tokens  │                  │
       │◄─────────────────┤                  │
       │                  │                  │
       │ 6. API Requests  │                  │
       │ (with JWT)       │                  │
       ├─────────────────►├─────────────────►│
       │                  │                  │ 7. Validate JWT
       │                  │                  │    & User Context
       │                  │                  │
       │                  │ 8. User Data     │
       │◄─────────────────┤◄─────────────────┤
```

### Data Isolation Strategy

```sql
-- Every query is automatically filtered by user
SELECT * FROM notes WHERE user_id = request.user.id;

-- Categories are user-specific
SELECT * FROM categories WHERE user_id = request.user.id;

-- Cross-user validation in serializers
def validate_category(self, value):
    if value and value.user != self.context['request'].user:
        raise ValidationError("Invalid category")
```

## 📊 Data Model Architecture

### Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
│                 │
│ • id (PK)       │
│ • username      │
│ • email         │
│ • password_hash │
│ • date_joined   │
└─────────┬───────┘
          │ 1:N
          │
┌─────────▼───────┐         ┌─────────────────┐
│    Category     │         │      Note       │
│                 │         │                 │
│ • id (PK)       │         │ • id (PK)       │
│ • user_id (FK)  │◄────────┤ • user_id (FK)  │
│ • name          │   0:N   │ • category_id   │
│ • color         │         │ • title         │
│ • created_at    │         │ • content       │
│ • updated_at    │         │ • priority      │
└─────────────────┘         │ • is_pinned     │
                            │ • is_archived   │
                            │ • tags          │
                            │ • created_at    │
                            │ • updated_at    │
                            └─────────────────┘
```

### Database Constraints

```sql
-- Unique category names per user
UNIQUE(user_id, name) ON categories

-- Foreign key constraints
FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL

-- Indexes for performance
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at);
CREATE INDEX idx_categories_user_id ON categories(user_id);
```

## 🔄 Request/Response Flow

### Creating a Note

```
1. User clicks "New Note" in UI
   ├─ Frontend creates optimistic UI update
   └─ Sends POST /api/notes/ to backend

2. Django receives request
   ├─ Middleware validates JWT token
   ├─ Extracts user from token
   └─ Routes to NoteViewSet.create()

3. NoteViewSet processing
   ├─ get_serializer() returns NoteSerializer
   ├─ Validates request data
   ├─ perform_create() sets user automatically
   └─ Returns serialized note data

4. Frontend receives response
   ├─ Updates local state with real data
   ├─ Shows success toast notification
   └─ Selects new note for editing
```

### User Data Isolation

```python
# Every ViewSet filters by user automatically
class NoteViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Serializer validates cross-references
class NoteSerializer(serializers.ModelSerializer):
    def validate_category(self, value):
        if value and value.user != self.context['request'].user:
            raise ValidationError("Invalid category")
```

## 📱 Frontend Architecture

### Component Hierarchy

```
App Layout
├── AuthPages (Login/Signup)
├── Dashboard
│   ├── Header
│   │   ├── SearchBox
│   │   ├── CreateButton
│   │   └── UserMenu
│   ├── Sidebar
│   │   ├── UserProfile
│   │   ├── Navigation
│   │   └── CategoryList
│   ├── NotesList
│   │   ├── NoteCard[]
│   │   └── LoadingState
│   ├── NoteEditor
│   │   ├── TitleInput
│   │   ├── ContentEditor
│   │   ├── CategorySelector
│   │   ├── PrioritySelector
│   │   └── TagManager
│   └── CategoryManager (Modal)
│       ├── CategoryForm
│       └── CategoryList
```

### State Management Pattern

```typescript
// Local component state for UI
const [isEditing, setIsEditing] = useState(false);
const [selectedNote, setSelectedNote] = useState<Note | null>(null);

// Server state through API calls
const [notes, setNotes] = useState<Note[]>([]);
const [categories, setCategories] = useState<Category[]>([]);

// Optimistic updates
const handleUpdateNote = async (id: number, updates: Partial<Note>) => {
  // 1. Update UI immediately (optimistic)
  setNotes((prev) =>
    prev.map((note) => note.id === id ? { ...note, ...updates } : note)
  );

  try {
    // 2. Send to server
    const updatedNote = await notesApi.update(id, updates);

    // 3. Replace with server response
    setNotes((prev) => prev.map((note) => note.id === id ? updatedNote : note));
  } catch (error) {
    // 4. Rollback on error
    loadData(); // Refresh from server
    toast.error("Failed to update note");
  }
};
```

## 🚀 Performance Architecture

### Backend Optimizations

```python
# Query optimization
class NoteViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)\
                          .select_related('category')\
                          .order_by('-is_pinned', '-updated_at')

# Pagination built-in
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20
}

# Database indexing
class Note(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['user', '-updated_at']),
            models.Index(fields=['user', 'category']),
        ]
```

### Frontend Optimizations

```typescript
// Component memoization
const NoteCard = React.memo(({ note, onUpdate }) => {
  // Only re-renders if note data changes
});

// Debounced search
const [searchQuery, setSearchQuery] = useState("");
const debouncedSearch = useDebounce(searchQuery, 300);

useEffect(() => {
  if (debouncedSearch) {
    loadNotes({ search: debouncedSearch });
  }
}, [debouncedSearch]);

// Virtual scrolling for large lists (future enhancement)
// Code splitting for better loading
const CategoryManager = lazy(() => import("./CategoryManager"));
```

## 🔧 Deployment Architecture

### Development Environment

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   localhost:3000│    │  localhost:8000 │
│                 │    │                 │
│ • Next.js Dev   │    │ • Django Dev    │
│ • Hot Reload    │    │ • SQLite DB     │
│ • TypeScript    │    │ • Debug Mode    │
└─────────────────┘    └─────────────────┘
```

### Production Environment (Local Development Focus)

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   (Static)      │    │   (Server)      │
│                 │    │                 │
│ • Built Assets  │    │ • Django Prod   │
│ • Optimized     │    │ • SQLite DB     │
│ • Minified      │    │ • Production    │
└─────────────────┘    └─────────────────┘
```

**Note**: This application uses SQLite for both development and production to
maintain simplicity and portability for interview/demo purposes.

### CI/CD Pipeline Architecture

```
GitHub Commit/PR
      │
      ▼
┌─────────────────────────────────────────────────────────┐
│                  GitHub Actions (4 Workflows)           │
├─────────────────┬─────────────────┬─────────────────────┤
│  Backend Tests  │ Frontend Tests  │  Integration Tests  │
│                 │                 │                     │
│ • Ruff Linting  │ • TypeScript    │ • SQLite Setup     │
│ • Format Check  │ • Prettier      │ • Django Server    │
│ • Django Tests  │ • Build Test    │ • E2E Placeholder  │
│ • Coverage      │ • Artifacts     │ • Health Check     │
└─────────────────┴─────────────────┴─────────────────────┤
│                   Code Quality                          │
│                                                         │
│ • Performance Check  • PR Comments                     │
└─────────────────────────────────────────────────────────┘
```

**Key Features:**

- **Path-based triggers**: Only runs relevant workflows when files change
- **Parallel execution**: Multiple workflows run simultaneously
- **SQLite consistency**: Same database in CI as local development
- **Modern tooling**: uv (Python) + Bun (JavaScript)
- **No deployment**: Local development focus for interview demo

## 📈 Scalability Considerations

### Current Architecture Benefits

- **SQLite**: Lightweight, portable, zero-configuration database
- **Single-file deployment**: Easy backup, migration, and distribution
- **Excellent performance**: For interview/demo use cases with low concurrency
- **No external dependencies**: Simplified deployment and setup

### Potential Scaling Considerations (If Needed)

- **SQLite**: Suitable for small to medium applications, single-writer scenarios
- **Concurrent access**: SQLite handles multiple readers well, single writer
- **File-based**: Easy to backup, replicate, and migrate

### Scaling Strategies

#### Phase 1: Basic Production

```
┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway/      │
│   (Frontend)    │    │   Heroku        │
│                 │    │   (Backend)     │
│ • CDN           │    │ • PostgreSQL    │
│ • Auto-scaling  │    │ • Single Proc   │
└─────────────────┘    └─────────────────┘
```

#### Phase 2: Horizontal Scaling

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   API Gateway   │    │   Database      │
│                 │    │                 │    │                 │
│ • Global Edge   │    │ • Load Balancer │    │ • Primary       │
│ • Asset Caching │    │ • Rate Limiting │    │ • Read Replicas │
└─────────────────┘    │ • Multiple Pods │    │ • Redis Cache   │
                       └─────────────────┘    └─────────────────┘
```

#### Phase 3: Microservices

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   User Service  │    │   Notes Service │
│                 │    │                 │    │                 │
│ • React SPA     │    │ • Auth/Profile  │    │ • CRUD Ops      │
│ • State Mgmt    │    │ • JWT Tokens    │    │ • Search        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛡️ Security Architecture

### Defense in Depth

1. **Client-Side**: Input validation, HTTPS enforcement
2. **Transport**: JWT tokens, CORS configuration
3. **API Layer**: Authentication, authorization, rate limiting
4. **Database**: User isolation, parameterized queries
5. **Infrastructure**: Environment variables, secrets management

### Security Checklist

- ✅ JWT authentication with refresh tokens
- ✅ User data isolation at database level
- ✅ Input validation on frontend and backend
- ✅ CORS configured for specific origins
- ✅ Django security middleware enabled
- ✅ Environment-specific configurations
- ❌ Rate limiting (needs implementation)
- ❌ Security headers (needs enhancement)
- ❌ Input sanitization (needs improvement)

## 🎯 Architecture Benefits

### Maintainability

- Clear separation of concerns
- Consistent patterns and conventions
- Comprehensive documentation
- Type safety with TypeScript

### Scalability

- Stateless backend design
- Database-level user isolation
- API-first architecture
- Component-based frontend

### Security

- JWT-based authentication
- User data isolation
- Input validation layers
- Security middleware

### Developer Experience

- Hot reloading in development
- Comprehensive error handling
- Clear API contracts
- Automated testing pipeline

This architecture provides a solid foundation for a production-ready note-taking
application with room for future enhancements and scaling.
