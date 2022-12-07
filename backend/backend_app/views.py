from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from . import serializers
from . import models

# Create your views here.
# def index (request):
#     index_file = open('static/index.html').read()
#     return HttpResponse(index_file)

class RoomView(generics.CreateAPIView):
    queryset= models.Room.objects.all()
    serializer_class = serializers.RoomSerializer