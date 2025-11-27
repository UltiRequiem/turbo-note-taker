# Database Migrations

This directory contains Django database migration files for the notes app.

## 📁 Contents

Migration files that track database schema changes over time:
- **Initial migrations**: Create tables for Category and Note models
- **Schema updates**: Add new fields, modify existing fields
- **Index additions**: Performance optimization migrations
- **Constraint changes**: Update database constraints and relationships

## 🔧 Migration System

### Django Migration Workflow
1. **Model Changes**: Modify models.py
2. **Create Migration**: `python manage.py makemigrations`
3. **Review Migration**: Check generated migration file
4. **Apply Migration**: `python manage.py migrate`

### Migration Files
Each migration file contains:
- **Dependencies**: Previous migrations this depends on
- **Operations**: Database operations to perform
- **Reversibility**: How to undo the migration if needed

## 📊 Current Schema

### Tables Created
- **notes_category**: User categories with colors
- **notes_note**: Notes with full metadata and relationships

### Key Features
- **Foreign Key Relationships**: User isolation and category assignment
- **Indexes**: Optimized queries for user-specific data
- **Constraints**: Data integrity and validation rules
- **Default Values**: Sensible defaults for new fields

## 🛠️ Common Commands

### Development Workflow
```bash
# Check for unapplied migrations
python manage.py showmigrations

# Create new migration after model changes
python manage.py makemigrations notes

# Apply migrations
python manage.py migrate

# Show migration SQL (without applying)
python manage.py sqlmigrate notes 0001
```

### Troubleshooting
```bash
# Reset migrations (development only)
rm notes/migrations/00*.py
python manage.py makemigrations notes

# Check migration status
python manage.py showmigrations --plan

# Fake apply migration (if already applied manually)
python manage.py migrate notes 0001 --fake
```

## 🔍 Migration Best Practices

### Safe Migrations
- **Backwards Compatible**: Avoid breaking changes
- **Data Preservation**: Ensure data migrations preserve existing data
- **Performance Aware**: Consider impact on large tables
- **Testing**: Test migrations on copy of production data

### Schema Design
- **Indexes**: Add indexes for frequently queried fields
- **Constraints**: Use database constraints for data integrity
- **Null Handling**: Carefully consider null vs default values
- **Field Types**: Choose appropriate field types for data

## 📋 Migration History

### Schema Evolution
1. **Initial Schema**: Basic Category and Note models
2. **User Isolation**: Added user foreign keys and constraints
3. **Performance**: Added database indexes for common queries
4. **Features**: Added pinning, archiving, and priority fields
5. **Tags Support**: Added tag storage and indexing

### Data Migrations
- **Default Categories**: Create default categories for new users
- **Tag Conversion**: Convert legacy tag formats if applicable
- **User Data**: Ensure proper user association for existing data

## 🚨 Important Notes

### Production Migrations
- **Backup First**: Always backup database before applying migrations
- **Downtime Planning**: Consider maintenance windows for schema changes
- **Rollback Plan**: Have a rollback strategy for failed migrations
- **Testing**: Test migrations on staging environment first

### Development vs Production
- **SQLite**: Development uses SQLite for simplicity
- **PostgreSQL**: Production may use PostgreSQL for scalability
- **Migration Compatibility**: Ensure migrations work across database types

This migration system ensures safe, tracked database schema evolution while maintaining data integrity and application functionality.