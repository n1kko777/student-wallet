from rest_framework import viewsets, generics

from operations.models import Operation
from users.models import CustomUser

from .serializers import OperationSerializer, UserSerializer


class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
