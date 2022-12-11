from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CASCADE

# Create your models here.

class User(AbstractUser):
  avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
  phone_number = models.CharField(max_length=200)
  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200)

  def __str__(self):
    return f"{self.username}"
