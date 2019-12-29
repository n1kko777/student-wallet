from rest_framework import viewsets, permissions
from rest_framework.generics import UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication, BasicAuthentication

from .permissions import IsOwnerOrReadOnly
from .serializers import WalletSerializer, CategorySerializer, OperationSerializer, UserSerializer, ChangePasswordSerializer

from users.models import CustomUser
from app.models import Wallet, Category, Operation


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class OperationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OperationSerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, TokenAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Operation.objects.filter(
            owner=self.request.user)
        return queryset


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, TokenAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Category.objects.filter(owner=self.request.user)
        return queryset


class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WalletSerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, TokenAuthentication, BasicAuthentication)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Wallet.objects.filter(owner=self.request.user)
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, TokenAuthentication, BasicAuthentication)

    def get_queryset(self):
        queryset = CustomUser.objects.filter(id=self.request.user.id)
        return queryset


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
        })
