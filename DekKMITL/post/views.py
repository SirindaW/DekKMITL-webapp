from django.shortcuts import render

from .models import Post

def post_view(request):
    posts = Post.objects.all()
    
    context = {
        'posts':posts
    } 
    
    return render(request,'post/posts.html',context)
