from rest_framework import serializers
from operations.models import Operation
from users.models import CustomUser
from rest_framework.authtoken.models import Token


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')


class OperationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        owner = serializers.ReadOnlyField(source='owner.email')
        fields = ('id', 'credit',
                  'removeFromAmount',
                  'category',
                  'wallet',
                  'created_at')


class UserSerializer(serializers.ModelSerializer):
    operations = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Operation.objects.all())

    class Meta:
        model = CustomUser
        fields = ('id', 'operations')
