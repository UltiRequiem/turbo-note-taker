from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .auth_views import signup, user_profile
from .views import CategoryViewSet, NoteViewSet

router = DefaultRouter()
router.register(r"notes", NoteViewSet, basename="note")
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("api/auth/signup/", signup, name="signup"),
    path("api/auth/profile/", user_profile, name="user_profile"),
    path("api/", include(router.urls)),
]
