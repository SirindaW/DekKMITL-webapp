from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse,reverse_lazy
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware
from django.contrib.auth.decorators import login_required

from .models import Post, Room, Tag, Comment
from .forms import PostCreateForm,CommentForm


def hx_tag_detail(request,tag_name,status):
    print('SOMETHING')
    if status == 'latest':
        posts = Post.objects.active().filter(tag__title=tag_name).order_by('-date_created')
    if status == 'temp':
        posts = Post.objects.active().filter(tag__title=tag_name,is_expirable=True).order_by('-date_created')
    print("GETTING LATEST")

    context = {
        'posts':posts,
    }
    template = "post/partials/tag_detail_post.html"
    return render(request,template,context)

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
    room = get_object_or_404(Room,title=room_name)
    context = {
        'room':room,
    }
    return render(request,'post/feed_page.html',context)

def room_list_view(request):
    rooms = Room.objects.all()
    context = {
        'rooms':rooms,
    }
    template = "post/room_list.html"
    return render(request,template,context)

def post_edit_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    if not (request.user.pk == post.author.pk or request.user.is_admin):
        return redirect(reverse('post:details_view'),kwargs={'post_slug':post.slug})
    if request.method=='POST':
        pass
        

    context = {
        
    }
    return render(request,'post/edit_post.html',context)

@login_required(login_url='login_view')
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
    
    tag_list_string = ",".join(str(tag.title) for tag in Tag.objects.all())
    
    context = {
        'form':form,
        'tag_list_string':tag_list_string,
    }

    return render(request,'post/create.html',context)

def post_delete_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    if (request.user.pk == post.author) or request.user.is_admin:
        post.delete()
    else:
        return redirect(reverse('post:details_view'),kwargs={'post_slug':post.slug})
    return redirect(reverse('profile_view'))

def feed_page_view(request):
    posts = Post.objects.active()
    context = {
        'posts':posts
    } 
    return render(request,'post/feed_page.html',context)

# post detail and comments
def post_detail_view(request,post_slug):
    post = get_object_or_404(Post,slug=post_slug)
    liked = post.liker.filter(id=request.user.id).exists()
    # Update views
    post.views += 1
    post.save()

    comment_form = CommentForm(request.POST)
    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment_form.save(commit=False)
            comment = Comment()
            comment.content = comment_form.cleaned_data.get('content')
            comment.post = post
            comment.author = request.user
            comment.save()
            
            return redirect(reverse('post:details_view',kwargs={'post_slug':post.slug}))
        else:
            print("FORM IS NOT VALID")
    
    context = {
        'post':post,
        'comment_form':comment_form,
    } 
    
    return render(request,'post/post_detail.html',context)

def delete_comment_view(request,id):
    comment = get_object_or_404(Comment,id=id)
    post = comment.post
    if (request.user == comment.author) or request.user.is_admin:
        comment.delete() 
    return redirect(reverse('post:details_view',kwargs={'post_slug':post.slug}))

@login_required(login_url='login_view')
def like_view(request,slug):
    post = get_object_or_404(Post,slug=slug)
    if post.liker.filter(id=request.user.id).exists():
        post.liker.remove(request.user)
    else:
        post.liker.add(request.user)
    return HttpResponseRedirect(reverse('post:details_view',args=[str(post.slug)]))

def tag_view(request):
    tags = Tag.objects.active()
    context = {
        'tags':tags,
    }
    return render(request,'post/tag.html',context)
    
def tag_detail_view(request,tag):
    tag = get_object_or_404(Tag,title=tag)
    posts_in_tag = Post.objects.filter(tag__title=tag.title)
    context = {
        'tag':tag,
        # 'posts':posts_in_tag,
    }
    return render(request,'post/tag_detail.html',context)

    
def comment_like_toggle_view(request,id):
    comment = get_object_or_404(Comment,id=id)
    comment.toggle_like(request.user)
    post_slug = comment.post.slug
    return redirect(reverse('post:details_view',kwargs={'post_slug':post_slug}))
