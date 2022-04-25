from django.urls import path
from . import views

app_name='post'
urlpatterns = [
    path('details/<slug:post_slug>/', views.post_detail_view,name='details_view'),
    path('create/', views.post_create_view,name='create_view'),
    path('delete/<slug:post_slug>', views.post_delete_view,name='delete_view'),
    path('feed-page/',views.feed_page_view,name='feed_page_view'),
    path('room/',views.room_list_view,name='room_list_view'),
    path('room/<str:room_name>',views.room_detail_view,name='room_detail_view'),
    path('room/hx/<str:room_name>/<str:status>',views.hx_room_detail,name='hx_room_detail'),
    path('like/<slug:slug>',views.like_view,name='like_view'),
    path('tag/',views.tag_view,name='tag_view'),
    path('tag/<str:tag>',views.tag_detail_view,name='tag_detail_view'),
    path('comment-like-toggle/<int:id>',views.comment_like_toggle_view,name='comment_like_toggle_view')
]