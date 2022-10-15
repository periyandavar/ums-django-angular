from ums.apps.blood_group.models import BloodGroup
from ums.apps.gender.models import Gender
from ums.apps.gender.serializer import GenderSerializer
from ums.apps.blood_group.serializer import BloodGroupSerializer
from .models import Employee, EmployeeEmail, EmployeeMobile
from rest_framework import serializers

class EmployeeMobileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EmployeeMobile
        fields = ['id', 'mobile']
        
class EmployeeEmailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EmployeeEmail
        fields = ['id', 'email']

class EmployeePostSerializer(serializers.ModelSerializer):
    # blood_group_id = serializers.StringRelatedField(
    #         # queryset = BloodGroup.objects.all(),
    #         many = False)
    gender = serializers.PrimaryKeyRelatedField(
            queryset = Gender.objects.all(),
            many = False)
    blood_group = serializers.PrimaryKeyRelatedField(
            queryset = BloodGroup.objects.all(),
            many = False)
    # blood_group = serializers.HyperlinkedIdentityField(
    #         # queryset = BloodGroup.objects.all(),
    #         view_name='blood_group',
    #         lookup_field = 'pk',
    #         many = False)
    # gender = serializers.HyperlinkedIdentityField(
    #         # queryset = Gender.objects.all(),
    #         view_name='gender',
    #         lookup_field = 'pk',
    #         many = False)
    gender_data = GenderSerializer(required=False)
    blood_group_data = BloodGroupSerializer(required=False)
    class Meta:
        model = Employee
        fields = '__all__'
        # fields = ['id', 'first_name', 'last_name', 'dob', 'created_at', 'updated_at', 'blood_group_id', 'gender_id']
        
class EmployeeGetSerializer(serializers.ModelSerializer):
    # blood_group_id = serializers.StringRelatedField(
    #         # queryset = BloodGroup.objects.all(),
    #         many = False)
    # gender = serializers.PrimaryKeyRelatedField(
    #         queryset = Gender.objects.all(),
    #         many = False)
    # blood_group = serializers.PrimaryKeyRelatedField(
    #         queryset = BloodGroup.objects.all(),
    #         many = False)
    # blood_group = serializers.HyperlinkedIdentityField(
    #         # queryset = BloodGroup.objects.all(),
    #         view_name='blood_group',
    #         lookup_field = 'pk',
    #         many = False)
    # gender = serializers.HyperlinkedIdentityField(
    #         # queryset = Gender.objects.all(),
    #         view_name='gender',
    #         lookup_field = 'pk',
    #         many = False)
    gender = GenderSerializer(required=False)
    blood_group = BloodGroupSerializer(required=False)
#     mobile = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#     email = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    mobile = EmployeeMobileSerializer(many=True)
    email = EmployeeEmailSerializer(many=True)
    
    class Meta:
        model = Employee
        fields = '__all__'
        # fields = ('id', 'first_name', 'last_name', 'dob', 'gender', 'blood_group'
        #           'mobile', 'email', 'gender', 'blood_group')
        # fields = ['id', 'first_name', 'last_name', 'dob', 'created_at', 'updated_at', 'blood_group_id', 'gender_id']
        
