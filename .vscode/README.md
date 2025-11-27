# VS Code Configuration

This directory contains Visual Studio Code workspace settings and recommended extensions for the Notes Taking App project.

## 📁 Contents

### settings.json
Workspace-specific VS Code settings for:
- **Python Configuration**: Django development settings, linting with Ruff
- **TypeScript/JavaScript**: Formatting with Prettier, ESLint integration
- **File Associations**: Django templates, configuration files
- **Editor Preferences**: Indentation, line endings, formatting rules

### extensions.json
Recommended extensions for optimal development experience:
- **Python Development**: Django support, Python linting, debugging
- **Frontend Development**: TypeScript, React, Tailwind CSS support
- **Code Quality**: Prettier, ESLint, GitLens
- **General Productivity**: Auto-formatting, IntelliSense, Git integration

## 🎯 Purpose

Ensures consistent development environment across team members by:
- **Standardizing Code Formatting**: Automatic formatting on save
- **Providing IntelliSense**: Enhanced code completion and error detection
- **Integrating Tools**: Seamless integration with linters, formatters, and debuggers
- **Optimizing Workflow**: Keyboard shortcuts and productivity enhancements

## 🔧 Configuration Details

### Python/Django Settings
- **Formatter**: Ruff (fast Python linter and formatter)
- **Import Organization**: Automatic import sorting
- **Django Support**: Template syntax highlighting, model field completion
- **Debugging**: Django application debugging configuration

### TypeScript/Next.js Settings
- **Formatter**: Prettier for consistent code style
- **Type Checking**: Real-time TypeScript error detection
- **React Support**: JSX/TSX syntax highlighting and IntelliSense
- **Auto-imports**: Automatic import path resolution

### General Editor Settings
- **Tab Size**: 2 spaces for JavaScript/TypeScript, 4 for Python
- **Line Endings**: LF for cross-platform compatibility
- **Trailing Whitespace**: Automatic removal on save
- **File Watching**: Efficient file system monitoring

## 📋 Recommended Extensions

### Essential Extensions
- **Python**: Official Python extension with Django support
- **Prettier**: Code formatter for JavaScript/TypeScript
- **ESLint**: JavaScript/TypeScript linting
- **Ruff**: Python linting and formatting

### Productivity Extensions
- **GitLens**: Enhanced Git integration and history
- **Auto Rename Tag**: Synchronized HTML/JSX tag renaming
- **Bracket Pair Colorizer**: Visual bracket matching
- **Path Intellisense**: File path autocompletion

### Framework-Specific Extensions
- **Django**: Template syntax and model support
- **React Snippets**: Common React patterns and snippets
- **Tailwind CSS IntelliSense**: Class name completion and validation
- **TypeScript Importer**: Automatic import suggestions

## 🚀 Setup Instructions

1. **Open Project**: Open the project root directory in VS Code
2. **Install Recommended Extensions**: Accept the popup to install recommended extensions
3. **Verify Settings**: Settings should automatically apply to the workspace
4. **Configure Python Path**: Set Python interpreter to the project's virtual environment

## 🔍 Troubleshooting

### Common Issues
- **Python Path**: Ensure Python interpreter points to `backend/.venv/bin/python`
- **Node Path**: Verify Node.js and Bun are properly installed
- **Extension Conflicts**: Disable conflicting extensions if formatting issues occur
- **File Association**: Check that Django templates are recognized correctly

### Performance Optimization
- **File Exclusions**: node_modules, .venv, and build directories excluded
- **Search Exclusions**: Binary files and logs excluded from search
- **Watcher Exclusions**: Efficient file watching for better performance

This configuration provides a seamless development experience optimized for full-stack Django and Next.js development.