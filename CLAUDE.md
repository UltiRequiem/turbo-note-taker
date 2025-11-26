# Notes Taking App - Full Specifications

## Project Overview

A modern note-taking application built with Django (backend) and Next.js
(frontend) that provides users with an intuitive interface to create, organize,
and manage their notes with categories and rich features.

## Tech Stack Requirements

- **Backend**: Django/Django REST Framework
- **Frontend**: Next.js with TypeScript
- **Database**: SQLite (for development)
- **Styling**: Tailwind CSS
- **Package Managers**: uv (Python), bun (JavaScript)

## Complete Feature Specifications

### 🔐 User Account and Authentication

#### Sign-up Screen

- Users see a sign-up screen when first visiting
- Required fields: email and password
- Password field includes a toggle button to view/hide password being typed
- Form validation for email format and password requirements
- Upon successful signup, user is redirected to the main application

#### Login Screen

- Accessible via navigation from sign-up screen
- Fields: email and password
- Password toggle functionality (same as signup)
- "Remember me" option
- Forgot password link (future enhancement)

#### User Session Management

- JWT-based authentication
- Session persistence across browser sessions
- Automatic logout after inactivity (optional)

### 📝 Initial State and Default Setup

#### New User Experience

- If no notes exist, show an "empty state" screen
- Welcome message encouraging user to create their first note
- Prominent "Create Note" button in empty state

#### Default Categories

When a new user registers, automatically create these categories:

1. **"Random Thoughts"** - Color: `#FF6B6B` (coral red)
2. **"School"** - Color: `#4ECDC4` (teal)
3. **"Personal"** - Color: `#45B7D1` (blue)

### ✨ Note Creation and Structure

#### Automatic Note Creation

- Clicking "new note" icon immediately creates a note (no save button needed)
- New notes auto-save as user types (debounced auto-save every 2-3 seconds)
- No explicit "save" action required from user

#### Note Data Structure

Each note contains:

- **Title**: Editable text field
- **Content**: Main note content (rich text area)
- **Category**: Dropdown selection from available categories
- **Last Edited Timestamp**: Automatically updated on any change
- **Created Timestamp**: Set once when note is created
- **User ID**: Links note to the authenticated user

#### Auto-save Behavior

- Content saves automatically while typing (debounced)
- Visual indicator shows "saving..." and "saved" states
- No data loss if user navigates away or closes browser

### 🎨 Display and Visual Design

#### Main Application Layout

- **Left Sidebar**: Categories list
- **Center Panel**: Notes preview cards
- **Right Panel**: Note editor/viewer

#### Category Display (Left Sidebar)

- Each category shows:
  - Associated color dot/circle
  - Category title
  - Number of notes in that category
- "All Categories" option to view all notes
- Clicking a category filters the main view to show only notes from that
  category

#### Category Background Colors

When a note's category is changed:

- The note's background color changes to match the category color
- Color is applied to the note preview card
- Color is also reflected in the note editor header

### 📋 Notes List (Center Panel)

#### Preview Cards

Each note preview card displays:

- **Date** of last edit (formatted as specified below)
- **Category name** and color indicator
- **Note title**
- **Content preview** (truncated if too long)

#### Date Formatting Rules

- **Today**: Show "today"
- **Yesterday**: Show "yesterday"
- **This year**: Show "Month DD" (e.g., "Nov 24")
- **Previous years**: Show "Month DD, YYYY" (e.g., "Nov 24, 2023")
- Never show the year for current year dates

#### Filtering and Sorting

- Default sort: Most recently edited first
- Pinned notes appear at the top
- Filter by category when category is selected in sidebar

### ✏️ Note Editing Experience

#### Opening Notes

- Clicking any note preview card opens it in the editor panel
- Editor shows full content with edit capabilities
- Category dropdown available in editor header

#### Editing Interactions

- Click on title to edit title inline
- Click on content area to edit content
- Editing automatically updates the "last edited" timestamp
- Changes save automatically (no manual save required)

#### Category Management

- Category dropdown in note editor
- Changing category immediately updates:
  - Note's category assignment
  - Background color of the note
  - Category count in sidebar
  - Last edited timestamp

### 🔧 Technical Implementation Details

#### Backend API Endpoints

- `POST /auth/signup/` - User registration
- `POST /auth/login/` - User authentication
- `GET /api/notes/` - List user's notes
- `POST /api/notes/` - Create new note
- `PUT /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note
- `GET /api/categories/` - List user's categories
- `POST /api/categories/` - Create new category

#### Authentication Flow

- JWT tokens for API authentication
- Token refresh mechanism
- Protected routes on frontend
- User-specific data isolation

#### Auto-save Implementation

- Debounced API calls (2-3 second delay)
- Optimistic UI updates
- Conflict resolution for concurrent edits
- Visual feedback for save status

#### Database Schema

```sql
Users: id, email, password_hash, created_at
Categories: id, user_id, name, color, created_at
Notes: id, user_id, category_id, title, content, created_at, updated_at
```

### 🎯 User Experience Goals

- **Immediate**: Notes create instantly when button is clicked
- **Seamless**: No save buttons, everything auto-saves
- **Visual**: Category colors provide immediate visual organization
- **Intuitive**: Date formatting uses natural language when possible
- **Fast**: Optimistic updates make the interface feel responsive

### 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface
- Swipe gestures for navigation (future enhancement)

### 🚀 Performance Requirements

- Page load time < 2 seconds
- Auto-save response time < 500ms
- Smooth animations and transitions
- Efficient API calls (pagination, caching)

### 🔮 Future Enhancements

- Rich text formatting (bold, italic, lists)
- File attachments
- Note sharing and collaboration
- Search functionality
- Dark mode toggle
- Note export (PDF, Markdown)
- Tags system (in addition to categories)
- Note templates
- Offline support with sync

## Development Notes

- Use TypeScript for better type safety
- Implement comprehensive error handling
- Add loading states for all async operations
- Include accessibility features (ARIA labels, keyboard navigation)
- Mobile responsive design with touch interactions
- Performance monitoring and optimization

This specification ensures a polished, user-friendly note-taking application
that prioritizes ease of use and visual organization.
