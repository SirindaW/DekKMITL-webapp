from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

from .models import Post
from .forms import PostForm

def post_create_view(request):
    form = PostForm()
    if request.method == "POST":
        form = PostForm(request.POST) 
        if form.is_valid():
            form.save(commit=False)
            instance = Post()
            messages.success(request,"Post created successfully.")
            return redirect('home_view')
        
    context = {
        'form':form,
    }

    return render(request,'post/create.html',context)

def post_view(request):
    posts = Post.objects.all()
    
    context = {
        'posts':posts
    } 
    
    return render(request,'post/posts_list.html',context)

def post_detail_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    context = {
        'post':post
    } 
    return render(request,'post/post_detail.html',context)
