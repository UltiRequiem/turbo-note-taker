# Next.js Frontend Documentation

## 🎨 Architecture Overview

This Next.js frontend provides a modern, responsive user interface for the notes application with TypeScript, Tailwind CSS, and optimized performance.

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── dashboard/         # Main application page
│   │   ├── globals.css        # Global styles and Tailwind
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Landing page with redirect
│   ├── components/            # Reusable React components
│   │   ├── CategoryManager.tsx    # Category CRUD interface
│   │   ├── Header.tsx         # Top navigation bar
│   │   ├── NoteEditor.tsx     # Note editing interface
│   │   ├── NotesList.tsx      # Notes listing with actions
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── lib/                   # Utilities and configurations
│   │   └── api.ts            # API client and HTTP utilities
│   └── types/                 # TypeScript type definitions
│       └── index.ts          # Shared type interfaces
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## 🔧 Key Files Explained

### `src/app/dashboard/page.tsx`

**Purpose**: Main application interface - the heart of the user experience

**Key Responsibilities**:

- Authentication state management
- Data fetching and state synchronization
- User interactions and API calls
- Component coordination and state sharing

**Features**:

- Real-time data synchronization
- Optimistic UI updates
- Error handling and user feedback
- Responsive layout management
- Empty states for new users

### `src/components/NoteEditor.tsx`

**Purpose**: Rich note editing interface with form validation

**Features**:

- Controlled form inputs with TypeScript
- Real-time validation and error handling
- Tag management with add/remove functionality
- Category selection and priority settings
- Auto-save capabilities with optimistic updates

### `src/components/NotesList.tsx`

**Purpose**: Displays notes in a clean, organized list format

**Features**:

- Virtual scrolling for performance
- Hover states with action buttons
- Priority indicators and category colors
- Relative date formatting
- Pin/archive/delete actions

### `src/components/CategoryManager.tsx`

**Purpose**: Full CRUD interface for category management

**Features**:

- Modal-based interface
- Color picker with predefined options
- Form validation and error handling
- Confirmation for deletions
- Real-time category updates

### `src/lib/api.ts`

**Purpose**: Centralized API client with authentication and error handling

**Key Features**:

- Axios-based HTTP client with interceptors
- Automatic JWT token attachment
- Token refresh mechanism
- Comprehensive error handling
- Type-safe API calls

## 🚀 Development Commands

```bash
# Development server
bun run dev

# Production build
bun run build

# Type checking
bun run type-check

# Linting
bun run lint
```

This frontend provides a modern, performant, and accessible user interface that delivers an excellent user experience across all devices.
