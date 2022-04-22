from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse,reverse_lazy
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware

from .models import Post, Room, Tag
from .forms import PostCreateForm


def hx_room_detail(request,room_name,status):
    if status == 'latest':
        posts = Post.objects.active().filter(room__title=room_name).order_by('-date_created')
    if status == 'temp':
        posts = Post.objects.active().filter(room__title=room_name,is_expirable=True).order_by('-date_created')
    context = {
    'posts':posts,
    }
    template = "post/partials/room_detail_post.html" 
    return render(request,template,context)

def room_detail_view(request,room_name):
    posts = Post.objects.active().filter(room__title=room_name).order_by('-date_created')
    room = get_object_or_404(Room,title=room_name)
    context = {
        'posts':posts,
        'room':room,
    }
    return render(request,'post/feed_page.html',context)

def room_list_view(request):
    context = {}
    template = "post/room_list.html"
    return render(request,template,context)

def post_create_view(request):
    form = PostCreateForm()
    if request.method == "POST":
        form = PostCreateForm(request.POST,request.FILES) 
        
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
                room = Room.objects.get(title='room_other')
            instance.room = room
            
            # Cover Image
            if request.FILES.get('cover_image'):
                instance.cover_image = request.FILES.get('cover_image')

            # Expire date
            if request.POST.get('expire_date'):
                instance.expire_date = make_aware(parse_datetime(request.POST.get('expire_date')))
                instance.is_expirable= True

            # Save to db
            instance.save()     
            
            # TAGS
            ts = form.cleaned_data.get('tag_string').split(',')
            ts = set(ts).difference(set(['',' ']))
            ts = list(ts)
            # print(ts)
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

        return redirect(reverse('post:details_view',kwargs={'post_slug':instance.slug}))
        
    context = {
        'form':form,
    }

    return render(request,'post/create.html',context)

def feed_page_view(request):
    posts = Post.objects.active()
    context = {
        'posts':posts
    } 
    return render(request,'post/feed_page.html',context)


def post_detail_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    liked = post.liker.filter(id=request.user.id).exists()
    context = {
        'post':post
    } 
    # Update views
    post.views += 1
    post.save()
    return render(request,'post/post_detail.html',context)

def like_view(request,slug):
    post = get_object_or_404(Post,slug=slug)
    if post.liker.filter(id=request.user.id).exists():
        post.liker.remove(request.user)
    else:
        post.liker.add(request.user)
    return HttpResponseRedirect(reverse('post:details_view',args=[str(post.slug)]))

def tag_view(request):
    tags = Tag.objects.all()
    context = {
        'tags':tags,
    }
    return render(request,'post/tag.html',context)
    