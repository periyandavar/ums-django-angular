import json
import sys
sys.path.append("..")
# from django.contrib.auth import update_last_login
# from rest_framework.views import APIView
from django.views.generic.detail import DetailView
from rest_framework_simplejwt.tokens import RefreshToken
from ums.serializers.LoginSerializer import LoginSerializer
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http.response import JsonResponse

@method_decorator(csrf_exempt, name='dispatch')
class LoginApiView(DetailView):
    def post(self, request):
        serializer = LoginSerializer(self, data=json.loads(request.body))
        serializer.is_valid()
        data = serializer.validated_data
        if (data is False):
            return JsonResponse({
                'status': False,
                'data': {
                    'message': 'Invalid credential'
                }
            })
        user = data['user']
        token = RefreshToken.for_user(user=user)
        result = {
            'status': True,
            'data' : { 'token': str(token), 'access_token': str(token.access_token), 'id': user.id}
        }
        return JsonResponse(result)
    