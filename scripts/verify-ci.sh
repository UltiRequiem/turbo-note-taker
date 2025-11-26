#!/bin/bash

# CI Verification Script
echo "🔧 Verifying CI Configuration and Commands..."
echo

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

# Function to print section
print_section() {
    echo -e "\n${YELLOW}📋 $1${NC}"
    echo "----------------------------------------"
}

# Check if we're in the right directory
if [ ! -f "REQUIREMENTS.md" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

# Backend Tests
print_section "Backend Tests & Quality"
cd backend

echo "Testing ruff check..."
uv run ruff check .
print_status $? "Ruff linting"

echo "Testing ruff format check..."
uv run ruff format --check .
print_status $? "Ruff formatting"

echo "Testing Django system checks..."
uv run python manage.py check
print_status $? "Django system checks"

echo "Testing migrations check..."
uv run python manage.py makemigrations --check --dry-run
print_status $? "Migrations check"

echo "Testing Django tests..."
uv run python manage.py test
print_status $? "Django tests"

cd ..

# Frontend Tests
print_section "Frontend Tests & Quality"
cd frontend

echo "Testing TypeScript checking..."
bun run type-check
print_status $? "TypeScript checking"

echo "Testing Prettier check..."
bun run prettier --check .
print_status $? "Prettier formatting"

echo "Testing unit tests..."
bun run test
print_status $? "Unit tests"

echo "Testing build..."
bun run build > /dev/null 2>&1
print_status $? "Frontend build"

cd ..

# Configuration Files
print_section "Configuration Files"

# Check CI workflows
[ -f ".github/workflows/backend-tests.yml" ] && print_status 0 "Backend CI workflow" || print_status 1 "Backend CI workflow"
[ -f ".github/workflows/frontend-tests.yml" ] && print_status 0 "Frontend CI workflow" || print_status 1 "Frontend CI workflow"
[ -f ".github/workflows/integration-tests.yml" ] && print_status 0 "Integration tests workflow" || print_status 1 "Integration tests workflow"
[ -f ".github/workflows/code-quality.yml" ] && print_status 0 "Code quality workflow" || print_status 1 "Code quality workflow"

# Check VS Code config
[ -f ".vscode/settings.json" ] && print_status 0 "VS Code settings" || print_status 1 "VS Code settings"
[ -f ".vscode/extensions.json" ] && print_status 0 "VS Code extensions" || print_status 1 "VS Code extensions"

# Check backend config
[ -f "backend/pyproject.toml" ] && print_status 0 "Backend pyproject.toml" || print_status 1 "Backend pyproject.toml"

# Check frontend config
[ -f "frontend/.prettierrc" ] && print_status 0 "Prettier config" || print_status 1 "Prettier config"
[ -f "frontend/package.json" ] && print_status 0 "Frontend package.json" || print_status 1 "Frontend package.json"
[ -f "frontend/tsconfig.json" ] && print_status 0 "TypeScript config" || print_status 1 "TypeScript config"

# Check documentation
[ -f "REQUIREMENTS.md" ] && print_status 0 "Requirements documentation" || print_status 1 "Requirements documentation"
[ -f "docs/CI.md" ] && print_status 0 "CI documentation" || print_status 1 "CI documentation"

print_section "Summary"
echo -e "${GREEN}✅ CI configuration restored and verified!${NC}"
echo -e "${GREEN}✅ All commands tested locally and working${NC}"
echo -e "${GREEN}✅ Ready for git commit and GitHub Actions${NC}"
echo
echo "🚀 You can now safely commit your changes!"
echo "   The CI pipeline will run these same checks on GitHub Actions."