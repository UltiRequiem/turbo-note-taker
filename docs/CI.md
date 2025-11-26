# CI/CD Pipeline Documentation

## 🚀 Overview

The Notes Taking App uses GitHub Actions for continuous integration with a split
workflow architecture for efficiency and maintainability. Each workflow focuses
on a specific concern and runs only when relevant files change. The CI pipeline
uses SQLite consistently across all environments for simplicity and portability.

## 📋 Workflow Files

### 1. Backend Tests & Quality (`backend-tests.yml`)

**Triggers:**

- Push/PR to `main` or `develop` branches
- Only when `backend/` files or the workflow file changes

**Steps:**

1. **Setup**: Python 3.11 + uv package manager
2. **Dependencies**: Install with `uv sync`
3. **Code Quality**:
   - Ruff linting: `uv run ruff check .`
   - Ruff formatting check: `uv run ruff format --check .`
4. **Django Checks**:
   - System checks: `python manage.py check`
   - Migration checks: `python manage.py makemigrations --check --dry-run`
5. **Testing**: Django test suite with coverage reporting
6. **Coverage**: Upload to Codecov

**Key Features:**

- Uses SQLite consistently (development and CI)
- Focused on Python/Django ecosystem with modern uv package manager
- Comprehensive code quality with Ruff (linting + formatting)
- Coverage reporting for backend code

### 2. Frontend Tests & Quality (`frontend-tests.yml`)

**Triggers:**

- Push/PR to `main` or `develop` branches
- Only when `frontend/` files or the workflow file changes

**Steps:**

1. **Setup**: Bun package manager (latest version)
2. **Dependencies**: `bun install --frozen-lockfile`
3. **Quality Checks**:
   - TypeScript: `bun run type-check`
   - ESLint: `bun run lint`
   - Prettier: `bun run prettier --check .`
4. **Testing**: `bun run test` (placeholder for future tests)
5. **Build**: `bun run build` to verify production build
6. **Artifacts**: Upload build artifacts for inspection

**Key Features:**

- Fast builds with Bun
- TypeScript type checking
- Build artifact preservation

### 3. Integration Tests (`integration-tests.yml`)

**Triggers:**

- Push/PR to `main` or `develop` branches
- Runs for any changes (full-stack testing)

**Steps:**

1. **Setup**: Both Python 3.11 + Bun environments
2. **Dependencies**: Install both backend and frontend deps
3. **Database**: Set up SQLite test database with migrations
4. **Server**: Start Django development server
5. **E2E Testing**: Placeholder for Playwright/Cypress tests
6. **Health Check**: Basic API connectivity test

**Key Features:**

- Full-stack environment setup with both Python and Bun
- SQLite consistency across all environments (no external database setup)
- Ready for E2E test framework integration (Playwright/Cypress)
- API health checks verify full-stack communication

### 4. Code Quality (`code-quality.yml`)

**Triggers:**

- Push/PR to `main` or `develop` branches

**Steps:**

1. **Performance Tests**:
   - Build size analysis
   - Basic performance metrics
   - No external services required
2. **PR Reports**:
   - Automated quality summary comments
   - Status of all checks
   - Local development focus messaging

**Key Features:**

- Simple performance metrics
- Automated PR feedback
- No external service dependencies

## 🎯 Design Principles

### Path-Based Triggering

```yaml
on:
  push:
    paths:
      - "backend/**"
      - ".github/workflows/backend-tests.yml"
```

- Workflows only run when relevant files change
- Faster CI times and reduced resource usage
- Clear separation of concerns

### Parallel Execution

- All workflows can run simultaneously
- No unnecessary dependencies between jobs
- Faster feedback for developers

### Local Development Focus

- Uses same tools as local development (SQLite, uv, bun)
- No production deployment complexity
- Interview-appropriate scope

### Consistent Tooling

- **Backend**: uv for Python package management (fast, modern)
- **Frontend**: Bun for JavaScript builds (fast, compatible)
- **Linting**: Ruff for Python (fast, comprehensive), Prettier for TypeScript
- **Database**: SQLite throughout all environments (development, CI, production)
- **Type Safety**: TypeScript with strict mode, Python with type hints

## 📊 Workflow Status

| Workflow          | Purpose                  | Status    | Runtime  |
| ----------------- | ------------------------ | --------- | -------- |
| Backend Tests     | Python/Django quality    | ✅ Active | ~2-3 min |
| Frontend Tests    | TypeScript/React quality | ✅ Active | ~2-3 min |
| Integration Tests | Full-stack testing       | ✅ Active | ~3-4 min |
| Code Quality      | Performance & PR reports | ✅ Active | ~2 min   |

## 🔧 Local Development Integration

### VS Code Setup

The project includes VS Code configuration (`.vscode/settings.json`) that
mirrors CI checks:

- Format on save with Prettier (frontend) and Ruff (backend)
- Same linting rules as CI
- TypeScript checking enabled

### Pre-commit Alignment

Run the same checks locally before pushing:

```bash
# Backend checks
cd backend
uv run ruff check .
uv run ruff format --check .
uv run python manage.py check

# Frontend checks
cd frontend
bun run type-check
bun run lint
bun run prettier --check .
```

## 🚫 What's NOT Included

### Deliberately Excluded:

- **Security scanning** - Removed per requirements
- **Deployment workflows** - Local development project only
- **External services** - No SonarCloud, complex monitoring
- **Production complexity** - Docker, Kubernetes, cloud providers

### Future Enhancements:

- **E2E Tests**: Add Playwright or Cypress framework
- **Unit Tests**: Expand test coverage for both frontend and backend
- **Performance**: Lighthouse integration for detailed metrics
- **Notifications**: Slack/Discord integration for team projects

## 📈 Benefits

### For Interview Demonstration:

✅ **CI/CD Knowledge**: Multiple focused workflows ✅ **Best Practices**:
Path-based triggers, parallel execution ✅ **Modern Tooling**: uv, Bun, Ruff,
TypeScript ✅ **Code Quality**: Comprehensive linting and formatting ✅
**Testing Strategy**: Unit, integration, and quality checks ✅
**Documentation**: Comprehensive project documentation

### For Development:

✅ **Fast Feedback**: Only relevant tests run on changes ✅ **Consistent
Quality**: Same tools in CI and local development ✅ **Easy Maintenance**:
Focused, single-purpose workflows ✅ **Parallel Execution**: Faster total CI
time

## 🎓 Interview Talking Points

### Architecture Decisions:

- **Split workflows** for focused responsibility and faster execution
- **Path-based triggers** for efficiency and resource optimization
- **SQLite consistency** between development and CI environments
- **Modern tooling** choices (uv, Bun) for performance

### Quality Assurance:

- **Multi-layer validation**: Linting, formatting, type checking, testing
- **Automated quality gates** prevent broken code from merging
- **Coverage reporting** ensures test completeness
- **Build verification** catches integration issues early

### Scalability Considerations:

- **Easy to extend** with additional workflows for new features
- **Framework-ready** for E2E tests, performance monitoring
- **Team-friendly** with automated PR feedback and clear status reporting

This CI setup demonstrates production-ready practices while maintaining
appropriate scope for a local development interview project.
