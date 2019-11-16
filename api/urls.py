from api.views import CustomAuthToken, UserViewSet, WalletViewSet, CategoryViewSet, OperationViewSet

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter


urlpatterns = [
    url(r'^api-token-auth/login', CustomAuthToken.as_view()),
]

router = DefaultRouter()
router.register(r'operations', OperationViewSet, basename='operations')
router.register(r'wallets', WalletViewSet, basename='wallets')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'users', UserViewSet, basename='users')

urlpatterns += router.urls
