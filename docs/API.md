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
