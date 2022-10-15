from rest_framework import permissions, viewsets
from ums.apps.gender.models import Gender
from .serializer import GenderSerializer
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view

    
def csrf_api_view(dec, *arg):
   return csrf_exempt(api_view(dec, *arg))
# Create your views here.

class GenderView(viewsets.ModelViewSet):
    """
    API endpoints for the gender model
    """
    queryset = Gender.objects.all().order_by('id')
    serializer_class = GenderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_fields = (
        '^value',
        'id',
    )
    
    def options(self, request, *args, **kwargs):
        return None
    
    @csrf_api_view(['POST'])
    def changeStatus(request, id):
        if 'status' not in request.data:
            raise ValidationError('Please provide the status')
        if not isinstance(request.data['status'], bool):
            raise ValidationError('Please provide valid status')
        gender = Gender(id=id)
        gender.status = request.data['status']
        gender.save(update_fields=['status'])
        return JsonResponse({
                'status': True,
                "data": {
                    "message": "succcess"
                }
            }, safe=False)