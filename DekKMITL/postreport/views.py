from django.shortcuts import render,redirect
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.contrib import messages
from .models import PostReport
from post.models import Post

def post_report_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    if  not PostReport.objects.all().filter(post__pk=post.pk).exists():
        pr = PostReport(post=post,reporter=request.user)
        pr.save() 
    messages.success(request,'Post reported successfully')
    return redirect(reverse('post:details_view',kwargs={'post_slug':post_slug}))