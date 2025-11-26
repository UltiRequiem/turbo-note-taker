# Notes Taking App Challenge 📝

A modern, full-stack note-taking application built with Django (backend) and Next.js (frontend). This project demonstrates a clean, scalable architecture with a RESTful API and a responsive user interface.

## 🚀 Features

- **Create, Read, Update, Delete (CRUD)** notes
- **Categories** for organizing notes
- **Priority levels** (High, Medium, Low) for note importance
- **Tags** system for flexible note organization
- **Pin/Unpin** notes for quick access
- **Archive/Unarchive** notes to keep workspace clean
- **Search functionality** across note titles, content, and tags
- **Filtering** by category, priority, and status
- **Responsive design** that works on desktop and mobile
- **Real-time toast notifications** for user feedback

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
turbofuck/
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

## 🚦 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- uv (Python package manager) - `curl -LsSf https://astral.sh/uv/install.sh | sh`
- bun (JavaScript runtime) - `curl -fsSL https://bun.sh/install | bash`

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   uv sync
   ```

3. **Run migrations**:
   ```bash
   uv run python manage.py migrate
   ```

4. **Create a superuser (optional)**:
   ```bash
   uv run python manage.py createsuperuser
   ```

5. **Start the development server**:
   ```bash
   uv run python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Start the development server**:
   ```bash
   bun run dev
   ```

The frontend will be available at `http://localhost:3000`

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
- **Django REST Framework** for rapid API development with built-in serialization, authentication, and permissions
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

This project was developed with the assistance of **Claude Code (Anthropic)** as the primary AI tool:

### How AI was Used:
1. **Architecture Planning** - AI helped design the overall system architecture and technology stack selection
2. **Code Generation** - AI generated the initial boilerplate for Django models, serializers, views, and React components
3. **Problem Solving** - AI assisted in debugging configuration issues (TailwindCSS PostCSS plugin, module resolution)
4. **Best Practices** - AI provided guidance on Django REST Framework patterns and React component design
5. **Documentation** - AI helped create comprehensive documentation and code comments
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

## 🔄 Future Enhancements

- [ ] User authentication and authorization
- [ ] Rich text editor for note content
- [ ] File attachments for notes
- [ ] Note sharing and collaboration
- [ ] Dark/light theme toggle
- [ ] Offline support with service workers
- [ ] Mobile app with React Native
- [ ] Real-time synchronization with WebSockets
- [ ] Full-text search with Elasticsearch
- [ ] Export notes to various formats (PDF, Markdown, etc.)

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