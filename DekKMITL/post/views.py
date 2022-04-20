from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse,reverse_lazy
from django.contrib import messages
from django.http import HttpResponseRedirect

from .models import Post, Room, Tag
from .forms import PostCreateForm, PostForm

def post_create_view(request):
    form = PostCreateForm()
    if request.method == "POST":
        form = PostCreateForm(request.POST) 
        
        if form.is_valid():
            form.save(commit=False)
            instance = Post()
            instance.title = form.cleaned_data['title']
            instance.content = form.cleaned_data['content']
            instance.author = request.user

            # ROOM
            room_value = request.POST.get('room')
            room = Room.objects.filter(title=room_value)
            if room.exists():
                room = room.first()
            else:
                # selected room does not match any existed room
                room = Room.objects.get(title='other')
            instance.room = room
            
            # Save to db
            instance.save()     
            
            # TAGS
            ts = form.cleaned_data.get('tag_string').split(',')
            ts = list(set(ts))
            for tag in ts:
                if Tag.objects.filter(title=tag).exists():
                    # Tag already existed
                    instance.tag.add(Tag.objects.get(title=tag))
                else:
                    new_tag = Tag(title=tag)
                    new_tag.save()
                    instance.tag.add(new_tag)
            
        else:
            print("FORM IS NOT VALID")

        # print(form.errors)


        # if form.is_valid():
        #     form.save(commit=False)
        #     instance = Post()
        #     instance.title= form.cleaned_data['title']
        #     instance.content = form.cleaned_data['content']
        #     instance.author = request.user
        #     instance.save()
        #     messages.success(request,"Post created successfully.")
        #     return redirect(reverse('profile_view'))
        
    context = {
        'form':form,
    }

    return render(request,'post/create.html',context)

def post_list_view(request):
    posts = Post.objects.all()
    
    context = {
        'posts':posts
    } 
    
    return render(request,'post/posts_list.html',context)

def post_detail_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    liked = post.likes.filter(id=request.user.id).exists()
    context = {
        'post':post
    } 
    # Update views
    post.views += 1
    post.save()
    return render(request,'post/post_detail.html',context)

def like_view(request,pk):
    post = get_object_or_404(Post,id=pk)
    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return HttpResponseRedirect(reverse('post:details_view',args=[str(post.slug)]))

def tag_view(request):
    return render(request,'post/tag.html')
    