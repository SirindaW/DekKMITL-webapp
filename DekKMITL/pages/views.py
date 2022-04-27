from django.shortcuts import render
from django.http import HttpResponse

from django.apps import apps
from post.models import Post, Comment, CommentLike, Tag, Room
from account.models import Account
from DekKMITL.utils import sort_queryset_by_key

from datetime import timedelta,timezone,datetime

class Top3Filter:
    ONE_DAY = timedelta(days=1)
    ONE_WEEK = timedelta(days=7)
    ONE_MONTH = timedelta(days=30)
    ALLTIME = 'ALLTIME'

    verbose = {
        str(ONE_DAY):'หนึ่งวัน',
        str(ONE_WEEK):'หนึ่งอาทิตย์',
        str(ONE_MONTH):'หนึ่งเดือน',
        str(ALLTIME):'เวลาทั้งหมด',
    }

    def get_verbose(period):
        return Top3Filter.verbose.get(str(period))

def hx_home_filter_verbose_view(request):
    return

def hx_home_filter_view(request, period='ONE_WEEK',verbose_only=False):
    period = Top3Filter.__dict__.get(period)
    if verbose_only:    
        return HttpResponse(Top3Filter.get_verbose(period))

    posts = Post.objects.none()
    active_posts = Post.objects.active()

    if period is not Top3Filter.ALLTIME:
        # do the time calculation and filter out the posts those have passed period time
        now = datetime.now(timezone.utc)
        for post in active_posts:
            diff = now-post.date_created
            if diff <= period:
                posts |= Post.objects.filter(pk=post.pk)
    else:
        posts = active_posts
            
    top3_posts = sort_queryset_by_key(posts,key=lambda post: post.liker.count(),amount=3)

    context = {
        'posts':top3_posts,
        'selected_filter_verbose':Top3Filter.get_verbose(period)
    }

    if request.htmx:
        template = 'pages/components/hx_partials/post_loop.html'
        return render(request,template,context)

    return HttpResponse('')

def home_view(request):
    
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
