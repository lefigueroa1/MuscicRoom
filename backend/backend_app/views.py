from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from . import serializers
from . import models
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
def index (request):
    index_file = open('static/index.html').read()
    return HttpResponse(index_file)






class RoomView(generics.CreateAPIView):
    print("marker 1")
    queryset= models.Room.objects.all()
    serializer_class = serializers.RoomSerializer

class CreateRoomView(APIView):
    print('marker 2')
    serializer_class = serializers.CreateRoomSerializer
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = models.Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
            else:
                room = models.Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
            
            return Response(serializers.RoomSerializer(room).data, status=status.HTTP_200_OK)

