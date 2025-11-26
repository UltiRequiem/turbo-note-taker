from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=email).exists():
        return Response(
            {"error": "User with this email already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create user (using email as username)
    user = User.objects.create_user(username=email, email=email, password=password)

    # Create default categories for the new user
    default_categories = [
        {"name": "Random Thoughts", "color": "#FF6B6B"},
        {"name": "School", "color": "#4ECDC4"},
        {"name": "Personal", "color": "#45B7D1"},
    ]

    for cat_data in default_categories:
        Category.objects.create(
            name=cat_data["name"], color=cat_data["color"], user=user
        )

    # Generate tokens
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
            },
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
def user_profile(request):
    return Response(
        {
            "user": {
                "id": request.user.id,
                "email": request.user.email,
            }
        }
    )
