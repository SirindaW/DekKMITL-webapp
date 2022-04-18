from django.urls import path
from . import views

app_name = 'account'
urlpatterns = [
    path('toggle-follow/<int:user_id>',views.toggle_follow_view,name='toggle_follow_view'),
    path('follower',views.follower_list_view,name='follower_list_view'),
    path('following',views.following_list_view,name='following_list_view')
]