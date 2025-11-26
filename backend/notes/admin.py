from django.contrib import admin
from .models import Note, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color', 'notes_count', 'created_at']
    search_fields = ['name']
    list_filter = ['created_at']
    ordering = ['name']

    def notes_count(self, obj):
        return obj.notes.count()
    notes_count.short_description = 'Notes Count'


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'priority', 'is_pinned', 'is_archived', 'created_at']
    search_fields = ['title', 'content', 'tags']
    list_filter = ['category', 'priority', 'is_pinned', 'is_archived', 'created_at']
    ordering = ['-created_at']
    list_editable = ['is_pinned', 'is_archived', 'priority']
