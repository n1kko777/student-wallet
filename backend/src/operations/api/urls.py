from operations.api.views import OperationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', OperationViewSet, basename='operations')
urlpatterns = router.urls
