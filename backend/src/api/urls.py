from api.views import OperationViewSet, UserListView

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(r'users', UserListView.as_view()),
]

router = DefaultRouter()
router.register(r'operations', OperationViewSet, basename='operations')
# router.register(r'users', UserListView.as_view(), basename='users')

urlpatterns += router.urls
