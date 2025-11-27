# GitHub Actions Workflows

This directory contains all GitHub Actions workflow files for automated CI/CD processes.

## 📁 Workflow Files

### Backend Workflows
- **Backend Testing**: Django tests, linting, and quality checks
- **Python Code Quality**: Ruff formatting and import organization

### Frontend Workflows
- **Frontend Testing**: Next.js build, TypeScript checking, and tests
- **JavaScript Code Quality**: Prettier formatting and ESLint validation

### Integration Workflows
- **Full Stack Testing**: End-to-end testing across backend and frontend
- **Database Migrations**: SQLite schema validation and migration testing

### Utility Workflows
- **Documentation Updates**: Automatic documentation generation and validation
- **Dependency Security**: Vulnerability scanning and dependency updates

## 🔧 Workflow Triggers

### Automatic Triggers
- **Push to main**: Full test suite runs
- **Pull Requests**: All quality checks and tests
- **Schedule**: Nightly security scans and dependency updates

### Manual Triggers
- **Workflow Dispatch**: Manual workflow execution for testing
- **Release Preparation**: Pre-release validation and build verification

## 📊 Workflow Features

### Performance Optimizations
- **Path-based filtering**: Only run relevant workflows when files change
- **Parallel execution**: Multiple workflows run simultaneously
- **Caching**: Dependencies cached for faster builds

### Quality Assurance
- **Multi-environment testing**: Test across different OS and dependency versions
- **Code coverage reporting**: Track test coverage trends
- **Security scanning**: Automated vulnerability detection

## 🛠️ Workflow Configuration

### Environment Variables
Workflows use the following environment configurations:
- **Python Version**: 3.11+
- **Node Version**: 18+
- **Package Managers**: uv (Python), Bun (JavaScript)
- **Database**: SQLite for consistent testing

### Secrets and Variables
Required GitHub secrets and variables:
- No external secrets needed (fully self-contained)
- All testing uses local SQLite databases
- No cloud services or external APIs required

## 📋 Maintenance

### Regular Updates
- **Dependency versions**: Keep action versions current
- **Runtime versions**: Update Python/Node versions as needed
- **Security patches**: Apply security updates promptly

### Monitoring
- **Workflow runs**: Monitor for failures and performance degradation
- **Build times**: Track and optimize slow workflows
- **Success rates**: Maintain high success rates for reliable CI/CD

These workflows ensure code quality, prevent regressions, and maintain a reliable development process.