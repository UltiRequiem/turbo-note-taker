# Next.js App Router

This directory contains the Next.js App Router structure with pages, layouts, and routing configuration.

## 📁 Directory Structure

```
app/
├── auth/          # Authentication pages
│   ├── login/     # Login page
│   └── signup/    # User registration page
├── dashboard/     # Main application dashboard
├── globals.css    # Global styles and Tailwind imports
├── layout.tsx     # Root layout component
└── page.tsx       # Landing page with redirect logic
```

## 🚀 Next.js App Router Features

### File-based Routing

- **Automatic Routes**: Each folder becomes a route
- **Nested Routing**: Folder hierarchy creates nested routes
- **Layout System**: Shared layouts across route groups
- **Loading States**: Built-in loading UI support

### Route Structure

- `/` - Landing page (redirects to appropriate auth/dashboard)
- `/auth/login` - User login page
- `/auth/signup` - User registration page
- `/dashboard` - Main application interface

## 🎨 Layout System

### Root Layout (`layout.tsx`)

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
```

**Features**:

- Global font loading (Inter)
- Base styling and CSS imports
- Consistent HTML structure
- Accessibility attributes

### Page Components

Each route contains a `page.tsx` file that serves as the route component:

- **Server Components**: By default for better performance
- **Client Components**: When interactivity is needed (`"use client"`)
- **TypeScript**: Full type safety for props and state

## 🔐 Authentication Flow

### Landing Page Logic (`page.tsx`)

```typescript
// Redirect logic based on authentication status
if (isAuthenticated) {
  redirect("/dashboard");
} else {
  redirect("/auth/signup");
}
```

### Auth Pages

- **Signup First**: New users see signup by default
- **Login Available**: Easy navigation to login from signup
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: User-friendly error messages

## 📱 Dashboard Layout

### Main Application Structure

```typescript
// dashboard/page.tsx - Three-panel layout
<div className="flex h-screen">
  <Sidebar /> {/* Left: Categories and navigation */}
  <NotesList /> {/* Center: Notes preview cards */}
  <NoteEditor /> {/* Right: Note editing interface */}
</div>
```

### Responsive Behavior

- **Desktop**: Full three-panel layout
- **Tablet**: Collapsible sidebar
- **Mobile**: Single-panel with navigation modals

## 🎯 Page-Specific Features

### Authentication Pages

- **Form Handling**: React Hook Form integration
- **Validation**: Real-time validation feedback
- **Loading States**: Spinner and disabled states during submission
- **Password Toggle**: Show/hide password functionality

### Dashboard Page

- **State Management**: Complex state for notes, categories, filters
- **Real-time Updates**: Optimistic updates with backend sync
- **Search and Filter**: Advanced filtering and search functionality
- **Keyboard Shortcuts**: Productivity enhancements

## 🔧 Global Styles (`globals.css`)

### Tailwind Configuration

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Custom base styles */
  html {
    @apply antialiased;
  }
}

@layer components {
  /* Reusable component classes */
  .btn-primary {
    @apply rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600;
  }
}
```

### Design System

- **Color Palette**: Category-based colors and neutral grays
- **Typography**: Consistent font hierarchy
- **Spacing**: Standardized spacing scale
- **Shadows**: Subtle elevation for depth

## 🚀 Performance Considerations

### Server Components

- **Default Behavior**: Server-side rendering for better performance
- **Data Fetching**: Server-side data fetching where appropriate
- **SEO Optimization**: Better search engine optimization

### Client Components

- **Minimal Usage**: Only when interactivity is required
- **Code Splitting**: Automatic code splitting for client components
- **Hydration**: Efficient client-side hydration

## 🔍 SEO and Metadata

### Page Metadata

```typescript
export const metadata: Metadata = {
  title: "Notes App - Personal Note Taking",
  description: "Organize your thoughts with categories and tags",
};
```

### Dynamic Metadata

- **Title Updates**: Page titles reflect current state
- **Description**: Contextual descriptions for each page
- **Open Graph**: Social media sharing optimization

## 🧭 Navigation Patterns

### Programmatic Navigation

```typescript
import { useRouter } from "next/navigation";

const router = useRouter();

// Navigate to dashboard after successful login
router.push("/dashboard");
```

### Link Components

```typescript
import Link from 'next/link';

<Link href="/dashboard" className="nav-link">
  Dashboard
</Link>
```

## 🔧 Development Workflow

### Hot Reload

- **Fast Refresh**: Instant updates during development
- **State Preservation**: Component state preserved across updates
- **Error Overlay**: Clear error messages and debugging info

### TypeScript Integration

- **Type Safety**: Full type checking for all components
- **IntelliSense**: Rich IDE support with autocompletion
- **Error Prevention**: Compile-time error catching

This App Router structure provides a modern, performant foundation for the notes application with excellent developer experience and user experience.
