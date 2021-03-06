from rest_framework import serializers
from rest_framework.authtoken.models import Token

from users.models import CustomUser
from app.models import Wallet, Operation, Category


class WalletSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wallet
        fields = ('id', 'wallet_amount',
                  'wallet_name', 'wallet_color', 'created_at')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'category_name',
                  'category_color', 'created_at')


class OperationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        fields = ('id', 'credit', 'wallet', 'category',
                  'operation_type', 'created_at')


class UserSerializer(serializers.ModelSerializer):
    wallets = WalletSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'wallets',
                  'categories', 'first_name', 'last_name')


class PasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')


class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
