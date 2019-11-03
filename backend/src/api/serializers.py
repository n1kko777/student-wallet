from rest_framework import serializers
from rest_framework.authtoken.models import Token

from category.models import Category
from operations.models import Operation
from wallet.models import Wallet
from users.models import CustomUser


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class OperationSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=True)

    class Meta:
        model = Operation
        fields = ('id', 'credit', 'category',
                  'created_at')


class WalletSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Wallet
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=True)
    wallets = serializers.StringRelatedField(many=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'wallets', 'category', 'user_amount')


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')
