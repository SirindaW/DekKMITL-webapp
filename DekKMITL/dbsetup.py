import json
from post.models import Post, Tag, Room
from account.models import Account
from django.core.files import File
posts = Post.objects.all()
tags = Tag.objects.all()
rooms = Room.objects.all()
accounts = Account.objects.all()


with open('roomlist.json','r') as file:
    room_infomation = json.loads(file.read())
if not rooms:
    for room in room_infomation:
        new_room = Room(title=room.get('title'),room_id=room.get('id'), icon=room['path'],verbose=room.get('verbose'))
        new_room.save()

    rooms = Room.objects.all()

