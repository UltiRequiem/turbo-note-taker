# API Documentation

## 🔗 Base URL

```
Development: http://localhost:8000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication

All API endpoints (except auth endpoints) require JWT authentication:

```http
Authorization: Bearer <access_token>
```

### Token Management

- Access tokens expire after 24 hours
- Refresh tokens expire after 30 days
- Tokens rotate on refresh for security

## 📝 API Endpoints

### Authentication Endpoints

#### Login

```http
POST /auth/login/
```

**Request Body:**

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Sign Up

```http
POST /auth/signup/
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

#### Token Refresh

```http
POST /auth/refresh/
```

**Request Body:**

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (200):**

```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### User Profile

```http
GET /auth/profile/
```

**Response (200):**

```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "user@example.com"
}
```

---

### Notes Endpoints

#### List Notes

```http
GET /notes/
```

**Query Parameters:**

- `search` (string): Search in title, content, and tags
- `category` (integer): Filter by category ID
- `priority` (string): Filter by priority (low, medium, high)
- `is_pinned` (boolean): Filter by pin status
- `is_archived` (boolean): Filter by archive status
- `tags` (string): Comma-separated tags to filter
- `ordering` (string): Order by field (e.g., `-created_at`)
- `page` (integer): Page number for pagination

**Response (200):**

```json
{
  "count": 25,
  "next": "http://localhost:8000/api/notes/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "My First Note",
      "category": 1,
      "category_name": "Personal",
      "category_color": "#45B7D1",
      "priority": "medium",
      "is_pinned": false,
      "is_archived": false,
      "created_at": "2025-11-26T10:30:00Z",
      "updated_at": "2025-11-26T10:30:00Z"
    }
  ]
}
```

#### Create Note

```http
POST /notes/
```

**Request Body:**

```json
{
  "title": "New Note",
  "content": "Note content here...",
  "category": 1,
  "priority": "high",
  "tag_list": ["work", "important"]
}
```

**Response (201):**

```json
{
  "id": 2,
  "title": "New Note",
  "content": "Note content here...",
  "category": 1,
  "category_name": "Work",
  "category_color": "#4ECDC4",
  "priority": "high",
  "is_pinned": false,
  "is_archived": false,
  "tags": "work, important",
  "tag_list": ["work", "important"],
  "created_at": "2025-11-26T15:45:00Z",
  "updated_at": "2025-11-26T15:45:00Z"
}
```

#### Get Note

```http
GET /notes/{id}/
```

**Response (200):**

```json
{
  "id": 1,
  "title": "My Note",
  "content": "Full note content...",
  "category": 1,
  "category_name": "Personal",
  "category_color": "#45B7D1",
  "priority": "medium",
  "is_pinned": false,
  "is_archived": false,
  "tags": "personal, thoughts",
  "tag_list": ["personal", "thoughts"],
  "created_at": "2025-11-26T10:30:00Z",
  "updated_at": "2025-11-26T10:30:00Z"
}
```

#### Update Note

```http
PATCH /notes/{id}/
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "priority": "high",
  "tag_list": ["updated", "important"]
}
```

**Response (200):**

```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Existing content...",
  "category": 1,
  "category_name": "Personal",
  "category_color": "#45B7D1",
  "priority": "high",
  "is_pinned": false,
  "is_archived": false,
  "tags": "updated, important",
  "tag_list": ["updated", "important"],
  "created_at": "2025-11-26T10:30:00Z",
  "updated_at": "2025-11-26T15:45:00Z"
}
```

#### Delete Note

```http
DELETE /notes/{id}/
```

**Response (204):** No content

#### Toggle Pin Status

```http
POST /notes/{id}/toggle_pin/
```

**Response (200):**

```json
{
  "id": 1,
  "is_pinned": true,
  "message": "Note pinned successfully"
}
```

#### Toggle Archive Status

```http
POST /notes/{id}/toggle_archive/
```

**Response (200):**

```json
{
  "id": 1,
  "is_archived": true,
  "message": "Note archived successfully"
}
```

---

### Categories Endpoints

#### List Categories

```http
GET /categories/
```

**Response (200):**

```json
[
  {
    "id": 1,
    "name": "Personal",
    "color": "#45B7D1",
    "notes_count": 5,
    "created_at": "2025-11-26T09:00:00Z",
    "updated_at": "2025-11-26T09:00:00Z"
  },
  {
    "id": 2,
    "name": "Work",
    "color": "#4ECDC4",
    "notes_count": 12,
    "created_at": "2025-11-26T09:00:00Z",
    "updated_at": "2025-11-26T09:00:00Z"
  }
]
```

#### Create Category

```http
POST /categories/
```

**Request Body:**

```json
{
  "name": "Projects",
  "color": "#FF6B6B"
}
```

**Response (201):**

```json
{
  "id": 3,
  "name": "Projects",
  "color": "#FF6B6B",
  "notes_count": 0,
  "created_at": "2025-11-26T16:00:00Z",
  "updated_at": "2025-11-26T16:00:00Z"
}
```

#### Update Category

```http
PATCH /categories/{id}/
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "color": "#9B59B6"
}
```

**Response (200):**

```json
{
  "id": 3,
  "name": "Updated Name",
  "color": "#9B59B6",
  "notes_count": 0,
  "created_at": "2025-11-26T16:00:00Z",
  "updated_at": "2025-11-26T16:30:00Z"
}
```

#### Delete Category

```http
DELETE /categories/{id}/
```

**Response (204):** No content

---

## 🚨 Error Responses

### Authentication Errors

```json
{
  "detail": "Invalid credentials"
}
```

### Validation Errors

```json
{
  "field_name": ["This field is required."],
  "another_field": ["Ensure this field has no more than 100 characters."]
}
```

### Permission Errors

```json
{
  "detail": "You do not have permission to perform this action."
}
```

### Not Found Errors

```json
{
  "detail": "Not found."
}
```

## 📊 Status Codes

- **200 OK**: Successful GET, PATCH requests
- **201 Created**: Successful POST requests
- **204 No Content**: Successful DELETE requests
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Permission denied
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## 🔒 Security Notes

1. All endpoints except authentication require valid JWT tokens
2. Users can only access their own data (user isolation)
3. CORS is configured for frontend domains
4. Rate limiting should be implemented in production
5. Use HTTPS in production environments

## 💡 Usage Examples

### JavaScript/TypeScript (Axios)

```typescript
// Login
const response = await axios.post("/api/auth/login/", {
  username: "user@example.com",
  password: "password123",
});

// Create note with token
const noteResponse = await axios.post("/api/notes/", {
  title: "My Note",
  content: "Note content...",
}, {
  headers: {
    Authorization: `Bearer ${response.data.access}`,
  },
});
```

### Python (Requests)

```python
import requests

# Login
response = requests.post('http://localhost:8000/api/auth/login/', {
    'username': 'user@example.com',
    'password': 'password123'
})
token = response.json()['access']

# Create note
note_response = requests.post('http://localhost:8000/api/notes/',
    json={'title': 'My Note', 'content': 'Note content...'},
    headers={'Authorization': f'Bearer {token}'}
)
```

### cURL

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "user@example.com", "password": "password123"}'

# Create note
curl -X POST http://localhost:8000/api/notes/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title": "My Note", "content": "Note content..."}'
```

This API provides complete CRUD functionality for a modern note-taking
application with proper authentication, user isolation, and comprehensive error
handling.

---

## 📚 Interactive API Documentation

### Swagger UI (Recommended)

**URL**: `http://localhost:8000/api/docs/`

**Features**:

- **Interactive Testing**: Try API calls directly in the browser
- **Authentication Setup**: Built-in JWT token authentication
- **Request/Response Examples**: Live examples with sample data
- **Parameter Documentation**: All query parameters explained
- **Schema Validation**: Real-time request validation

**How to Use**:

1. Visit `http://localhost:8000/api/docs/`
2. Click "Authorize" button to setup JWT authentication
3. Login via `/api/auth/login/` to get your access token
4. Copy the access token and paste it in the authorization modal
5. Now you can test any endpoint with the "Try it out" button

### ReDoc (Alternative)

**URL**: `http://localhost:8000/api/redoc/`

**Features**:

- **Beautiful Design**: Clean, readable documentation layout
- **Code Samples**: Multiple programming language examples
- **Comprehensive Details**: Detailed parameter and response documentation
- **Search Functionality**: Quickly find specific endpoints

### OpenAPI Schema

**URL**: `http://localhost:8000/api/schema/`

**Purpose**: Raw OpenAPI 3.0 specification in YAML format **Use Cases**:

- **Code Generation**: Generate client libraries for various languages
- **API Testing**: Import into Postman, Insomnia, or other tools
- **Documentation**: Generate custom documentation
- **Validation**: Validate API requests and responses

### Documentation Features

#### Auto-Generated Content

All documentation is automatically generated from your Django code:

- **ViewSet docstrings** → Endpoint descriptions
- **Serializer fields** → Request/response schemas
- **@extend_schema decorators** → Enhanced parameter documentation
- **Custom actions** → Special endpoint documentation

#### Available Endpoints Documented

**Authentication**:

- `POST /api/auth/login/` - JWT token authentication
- `POST /api/auth/refresh/` - Token refresh
- `POST /api/auth/signup/` - User registration
- `GET /api/auth/profile/` - User profile

**Notes Management**:

- `GET /api/notes/` - List notes with advanced filtering
- `POST /api/notes/` - Create new note
- `GET /api/notes/{id}/` - Get note details
- `PATCH /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note
- `POST /api/notes/{id}/toggle_pin/` - Pin/unpin note
- `POST /api/notes/{id}/toggle_archive/` - Archive/unarchive note
- `GET /api/notes/archived/` - List archived notes
- `GET /api/notes/pinned/` - List pinned notes
- `GET /api/notes/stats/` - User statistics

**Categories Management**:

- `GET /api/categories/` - List user categories
- `POST /api/categories/` - Create new category
- `GET /api/categories/{id}/` - Get category details
- `PATCH /api/categories/{id}/` - Update category
- `DELETE /api/categories/{id}/` - Delete category

#### Advanced Features

**Query Parameters Documentation**:

- Search functionality across multiple fields
- Filtering by category, priority, status
- Ordering and pagination options
- Tag-based filtering

**Security Documentation**:

- JWT authentication flow
- User data isolation
- Permission requirements
- CORS configuration

**Response Examples**:

- Sample requests and responses
- Error response formats
- Status code explanations
- Validation error details

### Quick Start with Documentation

1. **Start Django server**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Access Swagger UI**:
   - Open `http://localhost:8000/api/docs/`
   - Click "Authorize" and enter your JWT token
   - Test any endpoint with "Try it out"

3. **Get Authentication Token**:
   - Use `/api/auth/login/` endpoint in the docs
   - Copy the `access` token from response
   - Use it for subsequent API calls

4. **Explore Endpoints**:
   - Browse all available endpoints
   - See request/response schemas
   - Test with real data

This interactive documentation provides a complete reference for the Notes
Taking App API, making it easy for developers to understand and integrate with
the backend services.
