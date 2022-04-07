from django.shortcuts import get_object_or_404, render

from .models import Post

def post_view(request):
    posts = Post.objects.all()
    
    context = {
        'posts':posts
    } 
    
    return render(request,'post/posts.html',context)

def post_detail_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    context = {
        'post':post
    } 
    return render(request,'post/post_detail.html',context)
