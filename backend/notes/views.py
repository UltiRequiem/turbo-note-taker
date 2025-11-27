from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema, extend_schema_view
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import Category, Note
from .serializers import CategorySerializer, NoteListSerializer, NoteSerializer


@extend_schema_view(
    list=extend_schema(
        summary="List user categories",
        description="Retrieve all categories belonging to the authenticated user with notes count.",
        parameters=[
            OpenApiParameter("search", str, description="Search categories by name"),
            OpenApiParameter(
                "ordering",
                str,
                description="Order by: name, created_at, -name, -created_at",
            ),
        ],
    ),
    create=extend_schema(
        summary="Create a new category",
        description="Create a new category for the authenticated user. Category names must be unique per user.",
    ),
    retrieve=extend_schema(
        summary="Get category details",
        description="Retrieve details of a specific category owned by the authenticated user.",
    ),
    update=extend_schema(
        summary="Update category",
        description="Update a category owned by the authenticated user.",
    ),
    partial_update=extend_schema(
        summary="Partially update category",
        description="Partially update a category owned by the authenticated user.",
    ),
    destroy=extend_schema(
        summary="Delete category",
        description="Delete a category owned by the authenticated user. Notes in this category will have their category set to null.",
    ),
)
class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user-specific categories.

    Provides CRUD operations for categories with automatic user isolation.
    Each user can only see and modify their own categories.
    """

    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """Ensure only the category owner can update it"""
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You can only modify your own categories")
        serializer.save()

    def perform_destroy(self, instance):
        """Ensure only the category owner can delete it"""
        if instance.user != self.request.user:
            raise PermissionDenied("You can only delete your own categories")
        instance.delete()


@extend_schema_view(
    list=extend_schema(
        summary="List user notes",
        description="Retrieve all notes belonging to the authenticated user with filtering and search capabilities.",
        parameters=[
            OpenApiParameter("category", int, description="Filter by category ID"),
            OpenApiParameter(
                "priority", str, description="Filter by priority (low, medium, high)"
            ),
            OpenApiParameter("is_pinned", bool, description="Filter by pinned status"),
            OpenApiParameter(
                "is_archived", bool, description="Filter by archived status"
            ),
            OpenApiParameter(
                "search", str, description="Search in title, content, and tags"
            ),
            OpenApiParameter(
                "tags", str, description="Filter by tags (comma-separated)"
            ),
            OpenApiParameter(
                "ordering",
                str,
                description="Order by: title, created_at, updated_at, priority (add - for desc)",
            ),
        ],
    ),
    create=extend_schema(
        summary="Create a new note",
        description="Create a new note for the authenticated user.",
    ),
    retrieve=extend_schema(
        summary="Get note details",
        description="Retrieve details of a specific note owned by the authenticated user.",
    ),
    update=extend_schema(
        summary="Update note",
        description="Update a note owned by the authenticated user.",
    ),
    partial_update=extend_schema(
        summary="Partially update note",
        description="Partially update a note owned by the authenticated user.",
    ),
    destroy=extend_schema(
        summary="Delete note",
        description="Delete a note owned by the authenticated user.",
    ),
)
class NoteViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user-specific notes.

    Provides CRUD operations for notes with advanced filtering, searching,
    and custom actions like pin/archive. Each user can only see and modify
    their own notes.
    """

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["category", "priority", "is_pinned", "is_archived"]
    search_fields = ["title", "content", "tags"]
    ordering_fields = ["title", "created_at", "updated_at", "priority"]
    ordering = ["-is_pinned", "-updated_at"]

    def get_serializer_class(self):
        if self.action == "list":
            return NoteListSerializer
        return NoteSerializer

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        print(f"LIST API: Returning {len(response.data.get('results', []))} notes")
        for note in response.data.get('results', [])[:2]:  # Show first 2 notes
            print(f"LIST API: Note {note.get('id')}: title='{note.get('title')}', content='{note.get('content', 'NOT_PRESENT')[:50]}...'")
        return response

    def get_queryset(self):
        queryset = Note.objects.filter(user=self.request.user)

        # Filter by search query across multiple fields
        search = self.request.query_params.get("search", None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
                | Q(content__icontains=search)
                | Q(tags__icontains=search)
            )

        # Filter by tags
        tags = self.request.query_params.get("tags", None)
        if tags:
            tag_list = [tag.strip() for tag in tags.split(",")]
            for tag in tag_list:
                queryset = queryset.filter(tags__icontains=tag)

        return queryset

    def get_serializer_context(self):
        """Ensure request is available in serializer context"""
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    @extend_schema(
        summary="Toggle note pin status",
        description="Pin or unpin a note. Pinned notes appear at the top of the list.",
        responses={
            200: {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "is_pinned": {"type": "boolean"},
                    "message": {"type": "string"},
                },
            }
        },
    )
    @action(detail=True, methods=["post"])
    def toggle_pin(self, request, pk=None):
        note = self.get_object()
        note.is_pinned = not note.is_pinned
        note.save()
        return Response(
            {
                "id": note.id,
                "is_pinned": note.is_pinned,
                "message": f"Note {'pinned' if note.is_pinned else 'unpinned'} successfully",
            }
        )

    @extend_schema(
        summary="Toggle note archive status",
        description="Archive or unarchive a note. Archived notes are hidden from the main view.",
        responses={
            200: {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "is_archived": {"type": "boolean"},
                    "message": {"type": "string"},
                },
            }
        },
    )
    @action(detail=True, methods=["post"])
    def toggle_archive(self, request, pk=None):
        note = self.get_object()
        note.is_archived = not note.is_archived
        note.save()
        return Response(
            {
                "id": note.id,
                "is_archived": note.is_archived,
                "message": f"Note {'archived' if note.is_archived else 'unarchived'} successfully",
            }
        )

    @extend_schema(
        summary="List archived notes",
        description="Get all archived notes for the authenticated user.",
        responses={200: NoteListSerializer(many=True)},
    )
    @action(detail=False, methods=["get"])
    def archived(self, request):
        archived_notes = self.get_queryset().filter(is_archived=True)
        page = self.paginate_queryset(archived_notes)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(archived_notes, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="List pinned notes",
        description="Get all pinned notes for the authenticated user.",
        responses={200: NoteListSerializer(many=True)},
    )
    @action(detail=False, methods=["get"])
    def pinned(self, request):
        pinned_notes = self.get_queryset().filter(is_pinned=True)
        serializer = self.get_serializer(pinned_notes, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="Get user statistics",
        description="Get statistical information about user's notes and categories.",
        responses={
            200: {
                "type": "object",
                "properties": {
                    "total_notes": {"type": "integer"},
                    "active_notes": {"type": "integer"},
                    "pinned_notes": {"type": "integer"},
                    "archived_notes": {"type": "integer"},
                    "categories_count": {"type": "integer"},
                },
            }
        },
    )
    @action(detail=False, methods=["get"])
    def stats(self, request):
        total_notes = self.get_queryset().count()
        active_notes = self.get_queryset().filter(is_archived=False).count()
        pinned_notes = self.get_queryset().filter(is_pinned=True).count()
        archived_notes = self.get_queryset().filter(is_archived=True).count()

        return Response(
            {
                "total_notes": total_notes,
                "active_notes": active_notes,
                "pinned_notes": pinned_notes,
                "archived_notes": archived_notes,
                "categories_count": Category.objects.filter(
                    user=self.request.user
                ).count(),
            }
        )
