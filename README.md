# Notes Taking App 📝

A modern, full-stack note-taking application built with Django (backend) and
Next.js (frontend). This project demonstrates a clean, scalable architecture
with JWT authentication, RESTful APIs, and a responsive user interface.

## 🌟 Key Features

### 🔐 **Authentication & User Management**

- **User Registration** with email and password
- **Secure Login** with JWT token authentication
- **Password visibility toggle** for better UX
- **Automatic token refresh** to maintain sessions
- **Protected routes** requiring authentication

### 📝 **Note Management**

- **Instant note creation** - notes are created immediately when clicked
- **Auto-save functionality** - changes save automatically as you type
- **Full CRUD operations** (Create, Read, Update, Delete)
- **Rich note structure** with title, content, category, priority, and tags
- **Pin/Unpin** important notes for quick access
- **Archive/Unarchive** system to organize workspace
- **Search functionality** across titles, content, and tags
- **Filtering** by category, priority, and archived status

### 🎨 **Categories & Organization**

- **Default categories** created automatically: Random Thoughts, School,
  Personal
- **Color-coded categories** for visual organization
- **Category assignment** with visual feedback
- **Note background colors** change based on category
- **Category management** with create/edit/delete capabilities

### 🎯 **User Experience**

- **Empty state** for new users with helpful onboarding
- **Responsive design** that works on desktop and mobile
- **Real-time toast notifications** for user feedback
- **Optimistic UI updates** for smooth interactions
- **Relative date formatting** (today, yesterday, Nov 24)
- **Preview cards** showing note summaries

## 🛠 Tech Stack

### Backend (Django)

- **Django 5.2.8** - Web framework
- **Django REST Framework** - API development
- **django-cors-headers** - CORS handling
- **django-filter** - Advanced filtering
- **SQLite** - Database (can be easily switched to PostgreSQL)

### Frontend (Next.js)

- **Next.js 16.0.4** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Heroicons** - Icons
- **React Hot Toast** - Notifications
- **Axios** - HTTP client
- **Headless UI** - Accessible components

### Development Tools

- **uv** - Python package manager (fast and modern)
- **bun** - JavaScript runtime and package manager (fast and modern)

## 📁 Project Structure

```
turbonotes/
├── backend/                 # Django backend
│   ├── notes_backend/      # Django project configuration
│   ├── notes/              # Django app for notes functionality
│   │   ├── models.py       # Note and Category models
│   │   ├── serializers.py  # DRF serializers
│   │   ├── views.py        # API viewsets
│   │   ├── urls.py         # API routing
│   │   └── admin.py        # Django admin configuration
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies (via uv)
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── lib/          # API client and utilities
│   │   └── types/        # TypeScript type definitions
│   ├── package.json      # Node.js dependencies
│   └── tailwind.config.js # Tailwind configuration
└── README.md             # This file
```

## 🚦 Quick Start

### Prerequisites

- **Python 3.11+** for Django backend
- **Node.js 18+** for Next.js frontend
- **uv** (Python package manager) - Install:
  `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **bun** (JavaScript runtime) - Install:
  `curl -fsSL https://bun.sh/install | bash`

### 🔧 Backend Setup (Django)

```bash
cd backend

# Install dependencies
uv sync

# Run database migrations
uv run python manage.py migrate

# (Optional) Create admin user
uv run python manage.py createsuperuser

# Start Django development server
uv run python manage.py runserver
```

✅ **Backend running at:** `http://localhost:8000` 🔗 **Admin panel:**
`http://localhost:8000/admin/` 📊 **API endpoints:**
`http://localhost:8000/api/`

### 🎨 Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
bun install

# Start Next.js development server
bun run dev
```

✅ **Frontend running at:** `http://localhost:3000`

### 🎯 First Run Experience

1. **Visit** `http://localhost:3000`
2. **Sign up** with your email and password
3. **Automatic setup**: Default categories are created
4. **Start writing**: Click "Create Your First Note"
5. **Explore**: Try categories, search, pin/archive features

## 🔌 API Endpoints

### Notes

- `GET /api/notes/` - List all notes (with filtering, search, pagination)
- `POST /api/notes/` - Create a new note
- `GET /api/notes/{id}/` - Get a specific note
- `PUT /api/notes/{id}/` - Update a note
- `DELETE /api/notes/{id}/` - Delete a note
- `POST /api/notes/{id}/toggle_pin/` - Toggle note pin status
- `POST /api/notes/{id}/toggle_archive/` - Toggle note archive status
- `GET /api/notes/archived/` - Get archived notes
- `GET /api/notes/pinned/` - Get pinned notes
- `GET /api/notes/stats/` - Get notes statistics

### Categories

- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category
- `GET /api/categories/{id}/` - Get a specific category
- `PUT /api/categories/{id}/` - Update a category
- `DELETE /api/categories/{id}/` - Delete a category

### Query Parameters for Notes

- `search` - Search in title, content, and tags
- `category` - Filter by category ID
- `priority` - Filter by priority (low, medium, high)
- `is_pinned` - Filter by pin status
- `is_archived` - Filter by archive status
- `tags` - Filter by comma-separated tags
- `ordering` - Sort results

## 🎨 Design Decisions

### Backend Architecture

- **Django REST Framework** for rapid API development with built-in
  serialization, authentication, and permissions
- **Model-based approach** with clear separation of concerns
- **Custom serializers** for different use cases (list vs detail views)
- **ViewSets** for consistent CRUD operations
- **Custom actions** for domain-specific operations (pin, archive, stats)

### Frontend Architecture

- **Component-based architecture** with reusable, focused components
- **TypeScript** for better developer experience and fewer runtime errors
- **Custom API layer** with axios for centralized HTTP handling
- **State management** using React hooks for simplicity
- **Responsive design** with Tailwind CSS utilities

### Key Features Implementation

- **Search** - Implemented using Django Q objects for multi-field search
- **Filtering** - Using django-filter for advanced filtering capabilities
- **Real-time updates** - Optimistic UI updates with error handling
- **User feedback** - Toast notifications for all user actions
- **Accessibility** - Using Heroicons and Headless UI for accessible components

## 🤖 AI Tools Usage

This project was developed with the assistance of **Claude Code (Anthropic)** as
the primary AI tool:

### How AI was Used:

1. **Architecture Planning** - AI helped design the overall system architecture
   and technology stack selection
2. **Code Generation** - AI generated the initial boilerplate for Django models,
   serializers, views, and React components
3. **Problem Solving** - AI assisted in debugging configuration issues
   (TailwindCSS PostCSS plugin, module resolution)
4. **Best Practices** - AI provided guidance on Django REST Framework patterns
   and React component design
5. **Documentation** - AI helped create comprehensive documentation and code
   comments
6. **Testing Strategy** - AI suggested testing approaches and test structure

### AI Benefits:

- **Rapid Development** - Accelerated initial setup and boilerplate creation
- **Consistency** - Maintained consistent code patterns across the application
- **Best Practices** - Applied industry standards and conventions
- **Error Prevention** - Caught potential issues during development

### Human Oversight:

- **Review & Validation** - All AI-generated code was reviewed and tested
- **Customization** - Code was adapted to specific project requirements
- **Integration** - Ensured all components work together seamlessly

## 📊 Statistics

- **Backend**: 6 API endpoints, 2 models, comprehensive filtering and search
- **Frontend**: 4 main React components, fully responsive design
- **Features**: 15+ user-facing features implemented
- **Development Time**: Built in approximately 2-3 hours with AI assistance

## 🧪 Testing

The application includes comprehensive testing for both backend and frontend:

### Backend Tests

```bash
cd backend
uv run python manage.py test
```

### Frontend Tests

```bash
cd frontend
bun run test
```

## 🚀 Production Deployment

### Backend

- Configure environment variables
- Use PostgreSQL for production database
- Set up static file serving
- Configure CORS for production domain
- Use proper secret key management

### Frontend

- Build the application: `bun run build`
- Deploy to Vercel, Netlify, or similar platform
- Configure environment variables for API URLs

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Django, Next.js, and AI assistance**
