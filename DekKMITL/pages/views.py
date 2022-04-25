from django.shortcuts import render

from django.apps import apps
from post.models import Post, Comment, CommentLike, Tag, Room
from account.models import Account


def home_view(request):
    
    latest_posts = Post.objects.active().order_by('-date_created')[:7] # Recent 7 active posts
    temporary_posts = Post.objects.active().filter(is_expirable=True).order_by('-date_created')[:2]
    pop_rooms = Room.objects.all()[:7]
    try:
        room_educate = Room.objects.get(title='room_educate')
    except Room.DoesNotExist:
        room_educate = []
        
    print(room_educate.title)
    

    context = {
        'latest_posts':latest_posts,
        'temporary_posts':temporary_posts,
        'pop_rooms':pop_rooms,
        'room_educate':room_educate,
    }
    return render(request, "home.html", context)


def about_view(request):
    context = {}
    return render(request, "about.html", context)


def rules_view(request):
    context = {}
    return render(request, "pages/rules.html", context)


def report_view(request):
    context = {}
    return render(request, "pages/reports.html", context)
