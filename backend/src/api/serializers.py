from rest_framework import serializers
from operations.models import Operation
from users.models import CustomUser


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        owner = serializers.ReadOnlyField(source='owner.username')
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'operations')
