from django.urls import path

from . import views

urlpatterns = [
    
    
]

hx_patterns = [
    
    path('hx_home_filter_view',views.hx_home_filter_view,name='hx_home_filter_view'),
    path('hx_home_filter_view/<str:period>',views.hx_home_filter_view,name='hx_home_filter_view'),
    path('hx_home_filter_view/<int:verbose_only>',views.hx_home_filter_view,name='hx_home_filter_view'),
    
]


urlpatterns+=hx_patterns