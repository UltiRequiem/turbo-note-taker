# Scripts Directory

This directory contains utility scripts for development, testing, and CI/CD operations.

## 📁 Available Scripts

### 🔧 verify-ci.sh
**Purpose**: Comprehensive CI/CD verification and testing script

**Usage**:
```bash
# Run from project root
./scripts/verify-ci.sh

# Make executable if needed
chmod +x scripts/verify-ci.sh
```

**Features**:
- **Backend Testing**:
  - Ruff linting and formatting checks
  - Django system checks
  - Database migrations validation
  - Unit test execution

- **Frontend Testing**:
  - TypeScript type checking
  - Prettier formatting validation
  - Unit test execution
  - Production build testing

- **Configuration Validation**:
  - GitHub Actions workflow files
  - VS Code configuration
  - Project configuration files
  - Documentation completeness

**Output**:
- Colored status indicators (✅/❌)
- Section-based organization
- Detailed error reporting
- Final summary with recommendations

## 🚀 Script Usage

### Running Individual Components

The verification script tests the same commands that run in CI:

```bash
# Backend quality checks
cd backend
uv run ruff check .
uv run ruff format --check .
uv run python manage.py check
uv run python manage.py test

# Frontend quality checks
cd frontend
bun run type-check
bun run prettier --check .
bun run test
bun run build
```

### CI/CD Integration

This script mirrors the exact commands used in GitHub Actions workflows:
- `.github/workflows/backend-tests.yml`
- `.github/workflows/frontend-tests.yml`
- `.github/workflows/integration-tests.yml`
- `.github/workflows/code-quality.yml`

## 🛠️ Development Workflow

### Pre-commit Verification
```bash
# Before committing changes
./scripts/verify-ci.sh

# If all checks pass, proceed with commit
git add .
git commit -m "Your commit message"
```

### Troubleshooting

Common issues and solutions:

1. **Permission Denied**:
   ```bash
   chmod +x scripts/verify-ci.sh
   ```

2. **Not in Project Root**:
   ```bash
   # Must run from directory containing REQUIREMENTS.md
   cd /path/to/project/root
   ./scripts/verify-ci.sh
   ```

3. **Backend Failures**:
   ```bash
   cd backend
   # Fix formatting
   uv run ruff format .
   # Fix linting issues
   uv run ruff check . --fix
   ```

4. **Frontend Failures**:
   ```bash
   cd frontend
   # Fix formatting
   bun run prettier --write .
   # Check TypeScript errors
   bun run type-check
   ```

## 📊 Script Output Example

```
🔧 Verifying CI Configuration and Commands...

📋 Backend Tests & Quality
----------------------------------------
Testing ruff check...
✅ Ruff linting
Testing ruff format check...
✅ Ruff formatting
Testing Django system checks...
✅ Django system checks
Testing migrations check...
✅ Migrations check
Testing Django tests...
✅ Django tests

📋 Frontend Tests & Quality
----------------------------------------
Testing TypeScript checking...
✅ TypeScript checking
Testing Prettier check...
✅ Prettier formatting
Testing unit tests...
✅ Unit tests
Testing build...
✅ Frontend build

📋 Configuration Files
----------------------------------------
✅ Backend CI workflow
✅ Frontend CI workflow
✅ Integration tests workflow
✅ Code quality workflow
✅ VS Code settings
✅ VS Code extensions

📋 Summary
----------------------------------------
✅ CI configuration restored and verified!
✅ All commands tested locally and working
✅ Ready for git commit and GitHub Actions

🚀 You can now safely commit your changes!
```

## 🔍 Technical Details

### Script Features
- **Cross-platform**: Works on macOS, Linux, Windows (with Bash)
- **Color Output**: Visual feedback with colored status indicators
- **Error Handling**: Proper exit codes and error reporting
- **Directory Safety**: Validates execution from correct location
- **Comprehensive**: Tests all CI/CD pipeline components

### Dependencies
- **Backend**: uv, Python 3.11+
- **Frontend**: Bun, Node.js 18+
- **System**: Bash shell

### Exit Codes
- `0`: All checks passed
- `1`: One or more checks failed
- Script provides detailed output for debugging failures

## 🤝 Contributing

When adding new scripts:
1. Follow the same structure and conventions
2. Add proper error handling and validation
3. Include usage documentation
4. Test on multiple platforms
5. Update this README with new script details

## 📚 Related Documentation

- [CI.md](../docs/CI.md) - Detailed CI/CD pipeline documentation
- [Backend README](../backend/README.md) - Backend development guide
- [Frontend README](../frontend/README.md) - Frontend development guide

This scripts directory provides essential tools for maintaining code quality and ensuring CI/CD pipeline reliability.