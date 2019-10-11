from rest_framework.generics import ListAPIView, RetrieveAPIView

from operations.models import Operation
from .serializers import OperationSerializer


class OperationListView(ListAPIView):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer


class OperationDetailView(RetrieveAPIView):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer
