from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index),
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path("current_user", views.curr_user),
    path('room/', views.RoomView.as_view()),
    # path("room/<str:roomCode>", )
    path('create_room/', views.CreateRoomView.as_view()),
    re_path(r'.*', views.index),
    
]
