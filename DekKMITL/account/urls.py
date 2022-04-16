from django.urls import path
from . import views

app_name = 'account'
urlpatterns = [
    path('toggle-follow/<int:user_id>',views.toggle_follow_view,name='toggle_follow_view')
]