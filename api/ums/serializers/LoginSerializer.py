from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    model = User
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(
        label= {"Password"},
        # style = { "input_type": "password"},
        # trim_whitespace = False,
        # max_length = 128,
        # write_only = True
    )
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                return False
                # raise NotAuthenticated
        else:
            return False
            # raise NotAuthenticated
        
        data['user'] = user
        return data