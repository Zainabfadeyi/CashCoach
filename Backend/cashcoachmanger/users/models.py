from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class CustomUser(AbstractUser):
   id = models.AutoField(db_index=True,
                        primary_key=True)
   
   email = models.EmailField(unique=True, blank=False, null=False)
   