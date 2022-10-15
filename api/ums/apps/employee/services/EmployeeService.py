from django.core.exceptions import ValidationError
from ums.apps.employee.serializer import EmployeeGetSerializer, EmployeePostSerializer
from ums.apps.blood_group.models import BloodGroup
from ums.apps.gender.models import Gender

from ums.apps.employee.models import Employee, EmployeeEmail, EmployeeMobile

class EmployeeService():
    def saveEmployee(self, data):
        # if 'first_name' not in data:
        #     raise ValidationError('Please enter the first name')
        
        # if 'last_name' not in data:
        #     raise ValidationError('Please enter the last name')
        
        # if 'dob' not in data:
        #     raise ValidationError('Please enter the date of birth')
        
        # if 'gender' not in data:
        #     raise ValidationError('Please select the gender')
        
        # if 'blood_group' not in data:
        #     raise ValidationError('Please select the blood group')
        
        serializer = EmployeePostSerializer(data=data)
        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        employee = Employee(first_name=data['first_name'], last_name=data['last_name'], dob=data['dob'])
        employee.gender = Gender(id=data['gender'])
        employee.blood_group = BloodGroup(id=data['blood_group'])
        employee.save()
        
        
        if 'mobileNos' in data:
            for mobile_number in data['mobileNos']:
                self.addMobile(employee, mobile_number)
                
        if 'emailIds' in data:
            for email in data['emailIds']:
                self.addEmail(employee, email)
        
        return EmployeeGetSerializer(employee).data
    
    def addMobile(self, emp, mobile):
        empMobile = EmployeeMobile()
        empMobile.user = emp
        empMobile.mobile = mobile['mobileNumber']
        empMobile.save()
    
    def addEmail(self, emp, email):
        empEmail = EmployeeEmail()
        empEmail.user = emp
        empEmail.email = email['email']
        empEmail.save()