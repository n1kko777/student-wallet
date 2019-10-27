from rest_framework import viewsets, generics, permissions
from operations.models import Operation
from users.models import CustomUser

from .serializers import OperationSerializer, UserSerializer


class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OperationSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
