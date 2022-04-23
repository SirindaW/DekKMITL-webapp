from post.models import Post, Tag, Room
from account.models import Account
from django.core.files import File
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

room_infomation = [
    {'title':'room_review' , 'id' : 0, 'path': '/room_icon/room_review.png'},
{'title':'room_news' , 'id' : 1, 'path': '/room_icon/room_news.png'},
{'title':'room_educate' , 'id' : 2, 'path': '/room_icon/room_educate.png'},
{'title':'room_dorm' , 'id' : 3, 'path': '/room_icon/room_dorm.png'},
{'title':'room_food' , 'id' : 4, 'path': '/room_icon/room_food.png'},
{'title':'room_sport' , 'id' : 5, 'path': '/room_icon/room_sport.png'},
{'title':'room_travel' , 'id' : 6, 'path': '/room_icon/room_travel.png'},
{'title':'room_art' , 'id' : 7, 'path': '/room_icon/room_art.png'},
{'title':'room_pet' , 'id' : 8, 'path': '/room_icon/room_pet.png'},
{'title':'room_fashion' , 'id' : 9, 'path': '/room_icon/room_fashion.png'},
{'title':'room_camera' , 'id' : 10, 'path': '/room_icon/room_camera.png'},
{'title':'room_party' , 'id' : 11, 'path': '/room_icon/room_party.png'},
{'title':'room_talk' , 'id' : 12, 'path': '/room_icon/room_talk.png'},
{'title':'room_other' , 'id' : 13, 'path': '/room_icon/room_other.png'},
]

if not rooms:
    for room in room_infomation:
        new_room = Room(title=room.get('title'),room_id=room.get('id'), icon=room['path'])
        new_room.save()

    rooms = Room.objects.all()

