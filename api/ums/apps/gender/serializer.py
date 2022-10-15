from ums.apps.gender.models import Gender
from rest_framework import serializers


class GenderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Gender
        fields = ['id', 'value', 'status']