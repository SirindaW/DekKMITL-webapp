from post.models import Post, Tag, Room
from account.models import Account
posts = Post.objects.all()
tags = Tag.objects.all()
rooms = Room.objects.all()
accounts = Account.objects.all()

rooms_info = [
    {'title':'room_review','id':0},
    {'title':'room_news','id':1},
    {'title':'room_educate','id':2},
    {'title':'room_dorm','id':3},
    {'title':'room_food','id':4},
    {'title':'room_sport','id':5},
    {'title':'room_travel','id':6},
    {'title':'room_art','id':7},
    {'title':'room_pet','id':8},
    {'title':'room_fashion','id':9},
    {'title':'room_camera','id':10},
    {'title':'room_party','id':11},
    {'title':'room_talk','id':12},
    {'title':'room_other','id':13},
]

if not rooms:
    for room_info in rooms_info:
        new_room = Room(title=room_info.get('title'),room_id=room_info.get('id'))
        new_room.save()

    rooms = Room.objects.all()

