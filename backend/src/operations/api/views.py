from rest_framework import viewsets

from operations.models import Operation
from .serializers import OperationSerializer


class OperationViewSet(viewsets.ModelViewSet):
    serializer_class = OperationSerializer
    queryset = Operation.objects.all()
