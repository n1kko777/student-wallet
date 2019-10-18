from operations.api.views import OperationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'operations', OperationViewSet, basename='operations')
urlpatterns = router.urls
