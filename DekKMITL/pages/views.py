from django.shortcuts import render

from django.apps import apps
from post.models import Post, Comment, CommentLike, Tag, Room
from account.models import Account


def home_view(request):
    
    top3 = Post.objects.active()
    latest_posts = Post.objects.active().order_by('-date_created')[:7] # Recent 7 active posts
    temporary_posts = Post.objects.active().filter(is_expirable=True).order_by('-date_created')[:2]
    room_educate = Room.objects.get(title='room_educate')
    rooms = Room.objects.all()
    
    # sorting by most posts
    pop_rooms_dict = {}
    for room in rooms:
        pop_rooms_dict[room.title] = room.get_post().count()
    sort_orders = sorted(pop_rooms_dict.items(), key=lambda x: x[1], reverse=True)
    pop_rooms = Room.objects.none()
    for k,v in sort_orders:
        pop_rooms |= Room.objects.filter(title=k)
        
    room_educate_posts = room_educate.get_post()[:2] # 2 Most recent post in room_educate
    pop_rooms = pop_rooms[:7] # 7 Most popular rooms

    context = {
        'latest_posts':latest_posts,
        'temporary_posts':temporary_posts,
        'pop_rooms':pop_rooms,
        'room_educate':room_educate,
        'room_educate_posts':room_educate_posts,
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
