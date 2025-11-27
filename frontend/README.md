# Frontend - Next.js Application

This directory contains the Next.js frontend application that provides the user interface for the notes application.

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── dashboard/         # Main application dashboard
│   │   ├── globals.css        # Global styles with Tailwind
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Landing/redirect page
│   ├── components/            # Reusable React components
│   │   ├── CategoryManager.tsx # Category management modal
│   │   ├── Header.tsx         # Top navigation
│   │   ├── NoteEditor.tsx     # Note editing interface
│   │   ├── NotesList.tsx      # Notes listing component
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── lib/                   # Utilities and configurations
│   │   └── api.ts            # API client functions
│   └── types/                 # TypeScript definitions
│       └── index.ts          # Shared interfaces
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── bun.lock                   # Dependency lock file
├── next-env.d.ts             # Next.js types
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS config for Tailwind
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun (package manager)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:3000`

### Environment Setup

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Package Manager**: Bun

## 📱 Application Features

### Authentication
- User login and signup forms
- JWT token management
- Protected routes
- Automatic redirects

### Notes Management
- Create, read, update, delete notes
- Rich text editing
- Category assignment
- Priority levels
- Pin/archive functionality
- Tag management

### Categories
- Color-coded organization
- CRUD operations
- Default categories for new users

### User Experience
- Responsive design
- Auto-save functionality
- Optimistic updates
- Loading states
- Error handling

## 🧩 Key Components

### Dashboard (`src/app/dashboard/page.tsx`)
Main application interface handling:
- State management
- API integration
- Component orchestration
- User interactions

### NoteEditor (`src/components/NoteEditor.tsx`)
Note editing interface with:
- Form validation
- Real-time updates
- Category selection
- Tag management
- Auto-save

### NotesList (`src/components/NotesList.tsx`)
Notes display component featuring:
- Note cards with previews
- Action buttons (pin, archive, delete)
- Date formatting
- Category indicators
- Responsive grid layout

### CategoryManager (`src/components/CategoryManager.tsx`)
Category management modal with:
- Create/edit categories
- Color picker
- Delete confirmation
- Form validation

### Sidebar (`src/components/Sidebar.tsx`)
Navigation component showing:
- Category list
- Note counts
- Filter options
- User actions

## 🔧 Development Scripts

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run type checking
bun run type-check

# Run ESLint
bun run lint

# Format code
bun run format
```

## 🎯 API Integration

### Authentication Flow
1. Login/signup forms
2. JWT token storage
3. Automatic token attachment
4. Token refresh handling

### Data Management
- Optimistic updates
- Error handling
- Loading states
- Cache invalidation

### API Client (`src/lib/api.ts`)
Centralized HTTP client with:
- Axios configuration
- Request/response interceptors
- Token management
- Error handling

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Responsive design system
- Custom color scheme
- Component classes

### Design System
- Consistent spacing
- Color palette
- Typography scale
- Interactive states

## 🔍 TypeScript

### Type Definitions (`src/types/index.ts`)
Shared interfaces for:
- User data
- Notes structure
- Categories
- API responses

### Type Safety
- Strict TypeScript configuration
- API response typing
- Component prop validation
- Form validation

## 🚀 Performance

### Next.js Optimizations
- Static generation where possible
- Code splitting
- Image optimization
- Font optimization

### User Experience
- Optimistic updates
- Loading states
- Error boundaries
- Accessibility features

## 🔒 Security

- Environment variable usage
- JWT token security
- XSS prevention
- CSRF protection

## 🧪 Testing

```bash
# Add testing framework
bun add --dev @testing-library/react @testing-library/jest-dom jest

# Run tests (when implemented)
bun run test
```

## 🚀 Deployment

### Build Process
```bash
# Production build
bun run build

# Test production build locally
bun run start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🔧 Configuration Files

- **`next.config.js`**: Next.js settings
- **`tailwind.config.js`**: Tailwind customization
- **`tsconfig.json`**: TypeScript compiler options
- **`postcss.config.js`**: CSS processing

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bun Documentation](https://bun.sh/docs)