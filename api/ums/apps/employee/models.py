from django.db import models
from django.conf import settings
from django.core.validators import validate_email
from ums.apps.blood_group.models import BloodGroup
from ums.apps.gender.models import Gender
from ums.validators.validate import validate_mobile_number

# Create your models here.

class Employee(models.Model):
    class Meta:
        db_table = settings.PARAMS['database']['prefix'] + 'employee'

    first_name = models.CharField(max_length=20, null=False)
    last_name = models.CharField(max_length=20, null=False)
    dob = models.DateField()
    blood_group = models.ForeignKey(BloodGroup, on_delete=models.CASCADE)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    
    
class EmployeeMobile(models.Model):
    class Meta:
        db_table = settings.PARAMS['database']['prefix'] + 'employee_mobile'
    
    user = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='mobile')
    mobile = models.CharField(max_length = 20, null=False, blank=False, validators=[validate_mobile_number])
    
    def __str__(self) -> str:
        return self.mobile
    
    
class EmployeeEmail(models.Model):
    class Meta:
        db_table = settings.PARAMS['database']['prefix'] + 'employee_email'
    
    user = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='email')
    email = models.CharField(max_length = 220, validators=[validate_email], null=False, blank=False, unique=True)
    
    def __str__(self) -> str:
        return self.email
    
    