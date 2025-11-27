# GitHub Configuration

This directory contains GitHub-specific configuration files for the project.

## 📁 Contents

### workflows/
Contains GitHub Actions workflow files for Continuous Integration and Deployment.

## 🔧 Purpose

- **Automated Testing**: Run tests on every commit and pull request
- **Code Quality**: Ensure consistent formatting and linting
- **Build Verification**: Validate that both frontend and backend build successfully
- **Documentation**: Maintain up-to-date project documentation

## 📋 Available Workflows

See `workflows/` directory for detailed workflow configurations including:
- Backend testing with Django and Python
- Frontend testing with Next.js and TypeScript
- Integration testing across the full stack
- Code quality checks and formatting validation

## 🔗 Integration

These workflows automatically trigger on:
- Push to main branch
- Pull request creation
- Scheduled maintenance tasks

The CI/CD pipeline ensures code quality and prevents broken builds from reaching the main branch.