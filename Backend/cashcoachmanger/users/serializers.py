from .models import CustomUser
from rest_framework import serializers
from .forms import UserForm
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)  # Assuming public_id is the user ID

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']
        
class RegisterationSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password1 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        form = UserForm(data)
        if not form.is_valid():
            raise serializers.ValidationError(form.errors)
        return data

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )

User = get_user_model()

class LoginSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        data = {}
        email = attrs.get('email')
        password = attrs.get('password')

        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):
            refresh = self.get_token(user)
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            data['user'] = CustomUserSerializer(user).data
            if api_settings.UPDATE_LAST_LOGIN:
                update_last_login(None, user)
        else:
            raise ValidationError('Invalid email/password')

        return data
