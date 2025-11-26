from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, default="#3B82F6")  # Hex color code
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]
        unique_together = ["user", "name"]  # User can't have duplicate category names

    def __str__(self):
        return f"{self.user.email} - {self.name}"


class Note(models.Model):
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="notes"
    )
    priority = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default="medium"
    )
    is_pinned = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    tags = models.CharField(
        max_length=255, blank=True, help_text="Comma-separated tags"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_pinned", "-updated_at"]

    def clean(self):
        """Validate that category belongs to the same user as the note"""
        from django.core.exceptions import ValidationError

        if self.category and self.user_id and self.category.user_id != self.user_id:
            raise ValidationError("Category must belong to the same user as the note.")

    def __str__(self):
        return f"{self.user.email} - {self.title}"

    @property
    def tag_list(self):
        """Return tags as a list"""
        return [tag.strip() for tag in self.tags.split(",") if tag.strip()]

    def set_tags(self, tag_list):
        """Set tags from a list"""
        self.tags = ", ".join(tag_list)
