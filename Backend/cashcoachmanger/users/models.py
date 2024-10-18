from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid,random,string


class CustomUser(AbstractUser):
   id = models.AutoField(db_index=True,
                        primary_key=True)
   
   email = models.EmailField(unique=True, blank=False, null=False)
   first_name = models.CharField(max_length=30, blank=True)
   last_name = models.CharField(max_length=30, blank=True)

def __str__(self):
        return f"{self.user.username}'s Profile"

class PasswordResetOTP(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_otp(self):
        self.otp = ''.join(random.choices(string.digits, k=6))
        self.save()
