from rest_framework import permissions, viewsets
from ums.apps.employee.services.EmployeeService import EmployeeService

from ums.services import services
from .models import Employee
from .serializer import EmployeeGetSerializer, EmployeePostSerializer
from ums.core.DI import factory
from django.http.response import JsonResponse

# Create your views here.

class EmployeeView(viewsets.ModelViewSet, viewsets.GenericViewSet):
    """
    API endpoints for the blood-group model
    """
    queryset = Employee.objects.all().order_by('-created_at')
    # serializer_class = EmployeePostSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EmployeeGetSerializer
        return EmployeePostSerializer
    
    
    def create(self, request):
        # employeeService = factory.create(list(services.keys())[list(services.values()).index(EmployeeService)])
        employeeService = EmployeeService()
        val = employeeService.saveEmployee(request.data)
        return JsonResponse(val, safe=False)