from rest_framework import serializers
from .models import Note, Category


class CategorySerializer(serializers.ModelSerializer):
    notes_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'notes_count', 'created_at', 'updated_at']

    def get_notes_count(self, obj):
        return obj.notes.filter(is_archived=False).count()


class NoteSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    tag_list = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False,
        write_only=True
    )

    class Meta:
        model = Note
        fields = [
            'id', 'title', 'content', 'category', 'category_name', 'category_color',
            'priority', 'is_pinned', 'is_archived', 'tags', 'tag_list',
            'created_at', 'updated_at'
        ]

    def validate_category(self, value):
        """Ensure the category belongs to the current user"""
        if value is not None:
            request = self.context.get('request')
            if request and hasattr(request, 'user'):
                if not Category.objects.filter(id=value.id, user=request.user).exists():
                    raise serializers.ValidationError("Category does not exist or does not belong to user.")
        return value

    def create(self, validated_data):
        tag_list = validated_data.pop('tag_list', [])
        note = Note.objects.create(**validated_data)
        if tag_list:
            note.set_tags(tag_list)
            note.save()
        return note

    def update(self, instance, validated_data):
        tag_list = validated_data.pop('tag_list', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if tag_list is not None:
            instance.set_tags(tag_list)

        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['tag_list'] = instance.tag_list
        return data


class NoteListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)

    class Meta:
        model = Note
        fields = [
            'id', 'title', 'category', 'category_name', 'category_color',
            'priority', 'is_pinned', 'is_archived', 'created_at', 'updated_at'
        ]