from django.urls import path

from . import views
from .models import Account


app_name = 'account' # use at the begining of the name account:followers_view
urlpatterns = [
    
    path('follow-make/<int:user_id>',views.follow_make_view,name='follow_make_view'),
    
    
]