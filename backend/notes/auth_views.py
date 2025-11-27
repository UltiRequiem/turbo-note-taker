from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers

from .models import Category


class LoginRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(help_text="User's email address")
    password = serializers.CharField(help_text="User's password")


class SignupRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(help_text="User's email address")
    password = serializers.CharField(min_length=8, help_text="User's password (minimum 8 characters)")


class AuthResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
    user = serializers.JSONField()


@extend_schema(
    request=LoginRequestSerializer,
    responses={
        200: AuthResponseSerializer,
        400: {"description": "Invalid credentials"}
    },
    summary="User Login",
    description="Authenticate user with email and password and return JWT tokens.",
    examples=[
        OpenApiExample(
            "Login Request",
            value={
                "email": "user@example.com",
                "password": "password123"
            },
            request_only=True
        ),
        OpenApiExample(
            "Login Response",
            value={
                "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
                "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
                "user": {
                    "id": 1,
                    "email": "user@example.com"
                }
            },
            response_only=True
        )
    ]
)
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Authenticate user using email as username
    user = authenticate(username=email, password=password)

    if user is None:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_400_BAD_REQUEST,
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
        status=status.HTTP_200_OK,
    )


@extend_schema(
    request=SignupRequestSerializer,
    responses={
        201: AuthResponseSerializer,
        400: {"description": "Bad request - missing or invalid data"}
    },
    summary="User Registration",
    description="Register a new user account with email and password. Creates default categories for the user.",
    examples=[
        OpenApiExample(
            "Signup Request",
            value={
                "email": "user@example.com",
                "password": "password123"
            },
            request_only=True
        ),
        OpenApiExample(
            "Signup Response",
            value={
                "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
                "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
                "user": {
                    "id": 1,
                    "email": "user@example.com"
                }
            },
            response_only=True
        )
    ]
)
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


class UserProfileResponseSerializer(serializers.Serializer):
    user = serializers.JSONField()


@extend_schema(
    responses={200: UserProfileResponseSerializer},
    summary="Get User Profile",
    description="Get the authenticated user's profile information."
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
