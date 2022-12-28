from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index),
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path("current_user", views.curr_user),
    path('room/', views.RoomView.as_view()),
    path("get_room/", views.GetRoom.as_view()),
    path('create_room/', views.CreateRoomView.as_view()),
    path("join_room/", views.JoinRoom.as_view()),
    path("user_in_room/", views.UserInRoom.as_view()),
    re_path(r'.*', views.index),
    
]
