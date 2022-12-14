from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core import serializers as s
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . import serializers
from .models import *


# Create your views here.
def index (request):
    index_file = open('static/index.html').read()
    return HttpResponse(index_file)

@api_view(['POST'])
def signIn(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username = email, password=password)
    print(user)
    if user is not None and user.is_active:
        login(request._request, user)
        return JsonResponse({'sign_in': True})
    else:
        return JsonResponse({'sign_in': False})
   
@api_view(["GET"])
def curr_user(request):
    if request.user.is_authenticated:
        data = s.serialize("json", [request.user], fields=["email"])
        return HttpResponse(data)
    else:
        return JsonResponse({"user":None})

@api_view(['POST'])
def signUp(request):
    print('this is request.data: ', request.data)
    first_name = request.data['firstName']
    last_name = request.data['lastName']
    email = request.data['email']
    password = request.data['password']
    AppUser.objects.create_user(username = email, first_name=first_name, last_name=last_name, email=email, password=password )
    return JsonResponse({'sign_up': True})

def signOut(request):
    logout(request)
    return JsonResponse({'SIGN OUT': True})






class RoomView(generics.CreateAPIView):
   
    queryset= Room.objects.all()
    serializer_class = serializers.RoomSerializer

class CreateRoomView(APIView):
    serializer_class = serializers.CreateRoomSerializer
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
            
            # return Response(serializers.RoomSerializer(room).data, status=status.HTTP_200_OK)

