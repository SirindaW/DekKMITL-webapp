from django.contrib import admin
from django.urls import path, include

from pages.views import home_view, about_view
from account.views import register_view,login_view,logout_view,profile_view


urlpatterns = [
    path('admin/', admin.site.urls),

    path("",home_view,name='home_view'), 
    
    path("about/", about_view, name="about_view"),
    path("register/", register_view, name="register_view"),
    path("login/", login_view, name="login_view"),
    path("logout/", logout_view, name="logout_view"),
    path("profile/", profile_view, name="profile_view"),

    path("post/",include('post.urls'))
]
