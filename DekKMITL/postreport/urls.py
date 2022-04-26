from django.urls import path
from . import views

app_name='postreport'
urlpatterns = [
    path('post-report/<slug:post_slug>',views.post_report_view,name='post_report_view')
]