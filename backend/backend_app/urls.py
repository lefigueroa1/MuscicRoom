from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index),
    path('room/', views.RoomView.as_view()),
    # path('join/', views.RoomView.as_view()),
    re_path(r'.*', views.index),
    
]
