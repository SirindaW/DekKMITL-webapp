from django.urls import path
from . import views

app_name='post'
urlpatterns = [
    path('details/<slug:post_slug>/', views.post_detail_view,name='details_view'),
    path('create/', views.post_create_view,name='create_view'),
    path('feed-page/',views.feed_page_view,name='feed_page_view'),
    path('room/',views.room_list_view,name='room_list_view'),
    path('like/<slug:slug>',views.like_view,name='like_view'),
    path('tag/',views.tag_view,name='tag_view')
]