from rest_framework import serializers
from operations.models import Operation
from users.models import CustomUser


class OperationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        owner = serializers.ReadOnlyField(source='owner.email')
        fields = ('credit',
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
