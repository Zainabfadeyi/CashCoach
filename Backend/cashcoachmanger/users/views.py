from rest_framework import viewsets,status,generics
from .serializers import RegisterationSerializer,LoginSerializer,ProfileUpdateSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer
    
class RegisterationViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterationSerializer
    permission_classes = (AllowAny,)
    http_method_names = ('post')
    
    def create(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response({
            'refresh': res['refresh'],
            'access': res['access'],
        }, status=status.HTTP_201_CREATED)
        
class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ('post')
    
    def create(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
class RefreshViewset(viewsets.ViewSet,TokenRefreshView):
    http_method_names = ('post')
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data,
            status=status.HTTP_200_OK)
    
class UserDetailsView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user  # Get the authenticated user
        serializer = CustomUserSerializer(user)  # Serialize user data
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return user details

class ProfileUpdateViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user  # Get the authenticated user

    def perform_update(self, serializer):
        serializer.save()  # Save the updated user data