from django.urls import path
from . import views



app_name='post'
urlpatterns = [
    path('details/<slug:post_slug>/', views.post_detail_view,name='details_view'),
    path('create/', views.post_create_view,name='create_view'),
    path('list/', views.post_list_view,name='list_view'),
    path('like/<int:pk>',views.like_view,name='like_view')
]