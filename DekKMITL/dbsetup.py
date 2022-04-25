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
    {'title':'room_review' , 'id' : 0, 'path': '/room_icon/room_review.png','verbose':'รีวิว',},
{'title':'room_news' , 'id' : 1, 'path': '/room_icon/room_news.png','verbose':'ข่าวสาร',},
{'title':'room_educate' , 'id' : 2, 'path': '/room_icon/room_educate.png','verbose':'เด็กเรียน',},
{'title':'room_dorm' , 'id' : 3, 'path': '/room_icon/room_dorm.png','verbose':'หอพัก',},
{'title':'room_food' , 'id' : 4, 'path': '/room_icon/room_food.png','verbose':'มุมอร่อย',},
{'title':'room_sport' , 'id' : 5, 'path': '/room_icon/room_sport.png','verbose':'กีฬา',},
{'title':'room_travel' , 'id' : 6, 'path': '/room_icon/room_travel.png','verbose':'ท่องเที่ยว',},
{'title':'room_art' , 'id' : 7, 'path': '/room_icon/room_art.png','verbose':'งานอาร์ต',},
{'title':'room_pet' , 'id' : 8, 'path': '/room_icon/room_pet.png','verbose':'สัตว์เลี้ยง',},
{'title':'room_fashion' , 'id' : 9, 'path': '/room_icon/room_fashion.png','verbose':'แฟชั่น',},
{'title':'room_camera' , 'id' : 10, 'path': '/room_icon/room_camera.png','verbose':'ถ่ายรูป',},
{'title':'room_party' , 'id' : 11, 'path': '/room_icon/room_party.png','verbose':'ปาร์ตี้',},
{'title':'room_talk' , 'id' : 12, 'path': '/room_icon/room_talk.png','verbose':'คุยเล่น',},
{'title':'room_other' , 'id' : 13, 'path': '/room_icon/room_other.png','verbose':'อื่น ๆ',},
]

if not rooms:
    for room in room_infomation:
        new_room = Room(title=room.get('title'),room_id=room.get('id'), icon=room['path'],verbose=room.get('verbose'))
        new_room.save()

    rooms = Room.objects.all()

