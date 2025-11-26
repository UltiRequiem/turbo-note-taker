# Notes Taking App - Requirements Specification

## 🎯 User Experience Requirements

### 1. Authentication Flow

- [x] **First Login**: User sees sign-up screen with email and password
- [x] **Password Toggle**: Option to show/hide password while typing
- [x] **Login Navigation**: Users can switch between sign-up and login pages
- [x] **Form Validation**: Proper error handling for invalid credentials

### 2. Initial User Experience

- [x] **Empty State**: New users see empty state with no notes
- [x] **Automatic Categories**: App creates three default categories:
  - "Random Thoughts"
  - "School"
  - "Personal"
- [x] **User Isolation**: Each user sees only their own data

### 3. Note Creation & Management

- [x] **Instant Creation**: Clicking "new note" icon creates note immediately
- [x] **No Manual Save**: Notes auto-save without user intervention
- [x] **Note Structure**:
  - [x] Title field (editable)
  - [x] Content area (editable)
  - [x] Category assignment (changeable)
  - [❌] **MISSING**: Last edited timestamp display
- [x] **Category Colors**: Note background changes with category color
- [x] **Return to Main**: Users can close notes to return to main view

### 4. Note Display Screen

- [x] **Left Sidebar Categories**: Shows categories with:
  - [x] Category color indicator
  - [x] Category name
  - [x] Note count per category
- [x] **Category Filtering**: Click category to filter notes
- [x] **All Categories View**: Option to show all notes
- [x] **Preview Cards** containing:
  - [❌] **MISSING**: Proper date display (last edited)
  - [x] Category name
  - [x] Note title
  - [x] Truncated content

### 5. Date Display Rules ❌ **NOT IMPLEMENTED**

- [ ] **Format**: Month and day (no year)
- [ ] **Today**: Show "today" for same-day edits
- [ ] **Yesterday**: Show "yesterday" for previous day
- [ ] **Older**: Show "MMM DD" format for older dates

### 6. Note Editing

- [x] **Click to Edit**: Click note to open editor
- [x] **Title Editing**: Click title to edit
- [x] **Content Editing**: Click content to edit
- [❌] **MISSING**: Auto-update timestamps on edit
- [x] **Category Change**: Dropdown to change category

## 📋 Technical Requirements

### Backend (Django + uv)

- [x] **Python 3.11+** with uv package manager
- [x] **Django 5.2** with REST Framework
- [x] **JWT Authentication** with SimpleJWT
- [x] **SQLite Database** for all environments (dev, CI, production)
- [x] **User Model**: Django's built-in User model
- [x] **Category Model**: User-specific categories with colors
- [x] **Note Model**: Rich note structure with relationships
- [x] **API Endpoints**: Complete CRUD for notes and categories
- [x] **User Isolation**: Database-level data separation
- [x] **CORS Configuration**: Cross-origin support for frontend

### Frontend (Next.js + Bun)

- [x] **Next.js 16** with App Router
- [x] **TypeScript** for type safety
- [x] **Bun** package manager
- [x] **Tailwind CSS** for styling
- [x] **React Hooks** for state management
- [x] **Axios** for API communication
- [x] **JWT Token Management** with refresh
- [x] **Responsive Design** for all screen sizes
- [x] **Hot Toast Notifications** for user feedback
- [x] **Heroicons** for consistent iconography

### Development Tools & CI/CD

- [x] **VS Code Configuration**: Format on save, linting
- [x] **Ruff** for Python linting and formatting
- [x] **Prettier** for JavaScript/TypeScript formatting
- [x] **TypeScript Checking** with strict mode
- [x] **4 GitHub Actions Workflows**: Backend, Frontend, Integration, Code
      Quality
- [x] **SQLite CI Integration**: Consistent database across all environments
- [x] **Path-based Triggers**: Efficient workflow execution
- [x] **Modern Package Managers**: uv (Python) + Bun (JavaScript)

## 🚨 Missing Requirements

### Critical Missing Features:

#### 1. Date Display System ❌

**Status**: Not implemented **Impact**: High - Core UX requirement
**Requirements**:

- Display "today" for same-day edits
- Display "yesterday" for previous day edits
- Display "MMM DD" format for older dates
- Update timestamps on note edits

#### 2. Timestamp Updates ❌

**Status**: Partially implemented **Impact**: Medium - User feedback missing
**Requirements**:

- Show "last edited" timestamps in note editor
- Auto-update timestamps when content changes
- Display timestamps in note preview cards

## ✅ Requirements Status Summary

| Category           | Implemented | Missing | Status      |
| ------------------ | ----------- | ------- | ----------- |
| **Authentication** | 4/4         | 0       | ✅ Complete |
| **Initial UX**     | 3/3         | 0       | ✅ Complete |
| **Note Creation**  | 5/6         | 1       | ⚠️ 83%      |
| **Note Display**   | 5/6         | 1       | ⚠️ 83%      |
| **Date System**    | 0/4         | 4       | ❌ 0%       |
| **Note Editing**   | 4/5         | 1       | ⚠️ 80%      |

**Overall Completion**: 21/28 requirements (75%)

## 🎯 Priority Fixes Needed

### High Priority:

1. **Implement date display rules** - Core UX feature
2. **Add timestamp updates** - User feedback essential
3. **Show last edited in preview cards** - Information architecture

### Implementation Notes:

- Backend already has `created_at` and `updated_at` fields
- Frontend needs date formatting utilities
- Note editor needs timestamp display
- Preview cards need date information

## 🏗️ Architecture Compliance

### ✅ Following Requirements:

- **Modern Tech Stack**: Django + Next.js + TypeScript
- **Package Managers**: uv (Python) + Bun (JavaScript)
- **Database**: SQLite for development simplicity
- **Authentication**: JWT-based with proper token management
- **Responsive Design**: Mobile-first approach
- **Code Quality**: Comprehensive linting and formatting
- **CI/CD**: Multi-stage pipeline with quality checks

### 📊 Quality Metrics:

- **Type Safety**: 100% TypeScript coverage
- **Code Style**: Automated formatting (Ruff + Prettier)
- **Testing**: Framework in place for expansion
- **Documentation**: Comprehensive API and architecture docs
- **Security**: User isolation and input validation

## 🎓 Interview Demonstration Points

### ✅ Strengths:

- **Complete Authentication Flow**: Secure JWT implementation
- **Modern Architecture**: Clean separation of concerns
- **Quality Tooling**: Professional development setup
- **User Experience**: Intuitive interface design
- **Code Organization**: Maintainable and scalable structure

### ⚠️ Areas for Improvement:

- **Date Handling**: Missing core UX requirement
- **Timestamp Display**: User feedback incomplete
- **Test Coverage**: Placeholder tests need expansion

This specification serves as both a requirements checklist and implementation
guide for completing the notes-taking application to full specification
compliance.
