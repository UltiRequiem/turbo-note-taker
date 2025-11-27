# Frontend Source Code

This directory contains all the source code for the Next.js frontend application.

## 📁 Directory Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable React components
├── lib/          # Utility functions and API client
└── types/        # TypeScript type definitions
```

## 🎯 Architecture Overview

### Next.js App Router

Using Next.js 14 with the modern App Router for:

- **File-based Routing**: Automatic route generation from file structure
- **Layout System**: Shared layouts and nested routing
- **Server Components**: Optimized rendering and performance
- **TypeScript Integration**: Full type safety across the application

### Component Structure

- **Page Components**: Route-specific components in `app/` directory
- **Shared Components**: Reusable UI components in `components/` directory
- **Layout Components**: Shared layouts for consistent structure
- **Client Components**: Interactive components with state and events

## 🔧 Technology Stack

### Core Framework

- **Next.js 14**: React framework with App Router
- **React 18**: Component library with latest features
- **TypeScript**: Static typing for better development experience

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Responsive Design**: Mobile-first approach

### State Management

- **React Hooks**: Built-in state management
- **Custom Hooks**: Reusable stateful logic
- **Context API**: Global state for authentication
- **Server State**: API data management with proper caching

## 📊 Data Flow

### API Integration

- **Axios Client**: HTTP client for API communication
- **JWT Authentication**: Token-based authentication with automatic refresh
- **Error Handling**: Comprehensive error management and user feedback
- **Loading States**: Progressive loading and skeleton screens

### State Management Pattern

```typescript
// Local component state
const [notes, setNotes] = useState<Note[]>([]);

// API calls with error handling
try {
  const response = await api.get("/notes/");
  setNotes(response.data.results);
} catch (error) {
  handleError(error);
}

// Optimistic updates
const handleUpdate = (id: number, updates: Partial<Note>) => {
  // Update UI immediately
  setNotes((prev) =>
    prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
  );

  // Sync with backend
  api.patch(`/notes/${id}/`, updates);
};
```

## 🎨 Component Design

### Design System

- **Consistent Styling**: Standardized components with Tailwind classes
- **Color Palette**: Category-based color coding throughout the UI
- **Typography**: Consistent font sizes and weights
- **Spacing**: Uniform spacing system using Tailwind utilities

### Component Patterns

- **Composition**: Components built from smaller, focused components
- **Props Interface**: Clear TypeScript interfaces for all props
- **Event Handling**: Consistent event handling patterns
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔒 Security Implementation

### Authentication

- **JWT Tokens**: Secure token storage and management
- **Route Protection**: Protected routes for authenticated users
- **Automatic Logout**: Token expiry handling
- **Secure Storage**: Proper token storage practices

### Data Validation

- **Input Validation**: Client-side validation for user inputs
- **Type Safety**: TypeScript ensures type correctness
- **XSS Prevention**: Safe rendering of user-generated content
- **CSRF Protection**: Cross-site request forgery prevention

## 📱 Responsive Design

### Mobile-First Approach

- **Breakpoint System**: Tailwind responsive utilities
- **Touch-Friendly**: Large touch targets for mobile devices
- **Performance**: Optimized for mobile networks
- **Progressive Enhancement**: Works across all device types

### Layout Adaptations

- **Desktop**: Three-panel layout (sidebar, notes list, editor)
- **Tablet**: Collapsible sidebar with adaptive layout
- **Mobile**: Single-panel navigation with modal editor

## 🚀 Performance Optimization

### Next.js Features

- **Code Splitting**: Automatic code splitting for optimal loading
- **Image Optimization**: Next.js Image component for performance
- **Static Generation**: Pre-rendered pages where possible
- **Bundle Analysis**: Webpack bundle analyzer for optimization

### React Optimizations

- **Memoization**: React.memo for expensive components
- **Lazy Loading**: Dynamic imports for large components
- **Virtual Scrolling**: Efficient rendering of large lists (future)
- **Debounced Inputs**: Optimized search and auto-save

## 🧪 Testing Strategy

### Testing Approach

- **Component Testing**: Individual component functionality
- **Integration Testing**: Component interaction testing
- **E2E Testing**: Full user workflow testing
- **Type Testing**: TypeScript compilation as tests

### Testing Tools (Future Implementation)

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing
- **MSW**: API mocking for tests

## 🔧 Development Workflow

### Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting
- **Pre-commit Hooks**: Quality checks before commits

### Development Tools

- **Hot Reload**: Instant feedback during development
- **Error Boundaries**: Graceful error handling
- **DevTools**: React and Redux DevTools integration
- **Debugging**: Source maps and debugging support

This source code structure provides a maintainable, scalable foundation for the notes application frontend with modern React and Next.js best practices.
