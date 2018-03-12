from . import views
from django.urls import path, re_path

urlpatterns = [
	re_path(r'^$|^index', views.index, name = 'index'),
    path('getMsg/', views.getMsg, name = 'getMsg'),
    path('getMail/', views.getMail, name = 'getMsg'),
    path('chat/', views.chat, name = 'chat'),
    path('msgForm/', views.msgForm, name = 'msgForm'),
    path('clrsession/', views.clrsession, name = 'clrsession'),
]