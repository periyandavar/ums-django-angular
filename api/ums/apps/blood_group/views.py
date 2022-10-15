from email.utils import collapse_rfc2231_value
from rest_framework import permissions, viewsets
from .models import BloodGroup
from .serializer import BloodGroupSerializer
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view

    
def csrf_api_view(dec, *arg):
   return csrf_exempt(api_view(dec, *arg))

# Create your views here.

class BloodGroupView(viewsets.ModelViewSet, APIView):
    """
    API endpoints for the blood-group model
    """
    queryset = BloodGroup.objects.all().order_by('id')
    serializer_class = BloodGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # @csrf_exempt
    # @api_view(['GET', 'POST'])
    @csrf_api_view(['POST'])
    def changeStatus(request, id):
        if 'status' not in request.data:
            raise ValidationError('Please provide the status')
        if not isinstance(request.data['status'], bool):
            raise ValidationError('Please provide valid status')
        bloodGroup = BloodGroup(id=id)
        bloodGroup.status = request.data['status']
        bloodGroup.save(update_fields=['status'])
        return JsonResponse({
                'status': True,
                "data": {
                    "message": "succcess"
                }
            }, safe=False)
    
