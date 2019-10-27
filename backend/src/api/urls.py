from api.views import OperationViewSet, UserViewSet

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'operations', OperationViewSet, basename='operations')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = router.urls
