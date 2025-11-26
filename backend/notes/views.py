from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Note, Category
from .serializers import NoteSerializer, NoteListSerializer, CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'priority', 'is_pinned', 'is_archived']
    search_fields = ['title', 'content', 'tags']
    ordering_fields = ['title', 'created_at', 'updated_at', 'priority']
    ordering = ['-is_pinned', '-updated_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return NoteListSerializer
        return NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.filter(user=self.request.user)

        # Filter by search query across multiple fields
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(content__icontains=search) |
                Q(tags__icontains=search)
            )

        # Filter by tags
        tags = self.request.query_params.get('tags', None)
        if tags:
            tag_list = [tag.strip() for tag in tags.split(',')]
            for tag in tag_list:
                queryset = queryset.filter(tags__icontains=tag)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_pin(self, request, pk=None):
        note = self.get_object()
        note.is_pinned = not note.is_pinned
        note.save()
        return Response({
            'id': note.id,
            'is_pinned': note.is_pinned,
            'message': f'Note {"pinned" if note.is_pinned else "unpinned"} successfully'
        })

    @action(detail=True, methods=['post'])
    def toggle_archive(self, request, pk=None):
        note = self.get_object()
        note.is_archived = not note.is_archived
        note.save()
        return Response({
            'id': note.id,
            'is_archived': note.is_archived,
            'message': f'Note {"archived" if note.is_archived else "unarchived"} successfully'
        })

    @action(detail=False, methods=['get'])
    def archived(self, request):
        archived_notes = self.get_queryset().filter(is_archived=True)
        page = self.paginate_queryset(archived_notes)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(archived_notes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pinned(self, request):
        pinned_notes = self.get_queryset().filter(is_pinned=True)
        serializer = self.get_serializer(pinned_notes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_notes = self.get_queryset().count()
        active_notes = self.get_queryset().filter(is_archived=False).count()
        pinned_notes = self.get_queryset().filter(is_pinned=True).count()
        archived_notes = self.get_queryset().filter(is_archived=True).count()

        return Response({
            'total_notes': total_notes,
            'active_notes': active_notes,
            'pinned_notes': pinned_notes,
            'archived_notes': archived_notes,
            'categories_count': Category.objects.count()
        })
