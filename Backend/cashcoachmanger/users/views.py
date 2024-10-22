from rest_framework import viewsets,status,generics
from .serializers import RegisterationSerializer,LoginSerializer,ChangePasswordSerializer,EmailChangeSerializer,ProfileImageSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer
from .models import CustomUser,PasswordResetOTP
from django.core.mail import send_mail
    
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

    # Define the queryset to get the profile associated with the logged-in user
    def get_queryset(self):
        return CustomUserSerializer.objects.filter(user=self.request.user)

    # Override the retrieve method to get the profile of the logged-in user
    def retrieve(self, request, *args, **kwargs):
        profile = self.get_queryset().first()  # Get the user's profile
        if profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)


class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = CustomUser.objects.get(email=email)
            otp_instance, created = PasswordResetOTP.objects.get_or_create(user=user)

            # Generate a new OTP
            otp_instance.generate_otp()  # Make sure this method generates a string

            # Send OTP to user's email
            send_mail(
                'Your OTP for Password Reset',
                f'Your OTP is: {otp_instance.otp}',  # Ensure otp is a string
                'zyusuf957@gmail.com',  # Sender's email
                [email],  # Recipient's email
                fail_silently=False,
            )

            return Response({"message": "OTP sent to your email!"}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Email not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PasswordResetConfirmationView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        # Check the types of the variables
        if not isinstance(new_password, str):
            return Response({"error": "New password must be a string."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
            otp_instance = PasswordResetOTP.objects.get(user=user)

            if otp_instance.otp == otp:
                user.set_password(new_password)  # Ensure new_password is a string
                user.save()
                otp_instance.delete()  # Optionally delete the OTP after use
                return Response({"message": "Password reset successfully!"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({"error": "Email not found."}, status=status.HTTP_404_NOT_FOUND)
        except PasswordResetOTP.DoesNotExist:
            return Response({"error": "No OTP found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data,context={'request': request})
        
        if serializer.is_valid():
            # Check old password
            user = request.user
          
            # Set new password
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({"message": "Password changed successfully!"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangeEmailView(APIView):
    def put(self, request):
        user = request.user
        serializer = EmailChangeSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            new_email = serializer.validated_data['new_email']

            # Update the user's email
            user.email = new_email
            user.save()

            return Response({"message": "Email updated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileImageUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = ProfileImageSerializer(user, data=request.data, partial=True)  # 'partial=True' to allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Profile image updated successfully!",
                "image_url": user.image.url  # Return the image URL in response
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)