from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AreaViewSet

router = DefaultRouter()
router.register(r'areas', AreaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
