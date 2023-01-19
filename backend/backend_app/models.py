from django.db import models
from django.contrib.auth.models import (AbstractUser)
import string
import random

# generates a random code that doesnt exist
def gen_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() ==0:
            break
    return code

# Create your models here.
class AppUser(AbstractUser):
    first_name = models.CharField(max_length=255, default=False)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Room(models.Model):
    code = models.CharField(
    max_length=8, default=gen_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)

class SpotifyToken(models.Model):
    user = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=255)

class Vote(models.Model):
    user = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)