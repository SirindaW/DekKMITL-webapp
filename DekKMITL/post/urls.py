from django.urls import path
from . import views


urlpatterns = [
    path('', views.post_view,name='posts_view'),
    path('<slug:post_slug>/', views.post_detail_view,name='post_detail_view'),
]