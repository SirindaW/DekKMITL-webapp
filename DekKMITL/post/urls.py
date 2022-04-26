from django.urls import path
from . import views

app_name='post'
urlpatterns = [
    path('all-post/', views.all_post_view,name='all_post_view'),
    path('all-post/<str:status>', views.all_post_view,name='all_post_view'),
    path('details/<slug:post_slug>/', views.post_detail_view,name='details_view'),
    path('create/', views.post_create_view,name='create_view'),
    path('edit/<slug:post_slug>', views.post_edit_view,name='edit_view'),
    path('delete/<slug:post_slug>', views.post_delete_view,name='delete_view'),
    path('feed-page/',views.feed_page_view,name='feed_page_view'),
    path('room/',views.room_list_view,name='room_list_view'),
    path('room/<str:room_name>',views.room_detail_view,name='room_detail_view'),
    path('like/<slug:slug>',views.like_view,name='like_view'),
    path('tag/',views.tag_view,name='tag_view'),
    path('tag/<str:tag>',views.tag_detail_view,name='tag_detail_view'),
    path('comment-like-toggle/<int:id>',views.comment_like_toggle_view,name='comment_like_toggle_view'),
    path('comment-delete/<int:id>',views.delete_comment_view,name='delete_comment_view'),
]
hx_patterns = [    
    path('room/hx/<str:room_name>/<str:status>',views.hx_room_detail,name='hx_room_detail'),
    path('tag/hx/<str:tag_name>/<str:status>',views.hx_tag_detail,name='hx_tag_detail'),
]
urlpatterns+= hx_patterns