from .models import BloodGroup
from rest_framework import serializers


class BloodGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BloodGroup
        fields = ['id', 'value', 'status']