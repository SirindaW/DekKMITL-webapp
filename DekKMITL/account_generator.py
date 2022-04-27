# from account.models import Account,AccountManager
import json
import string
import random

AMOUNT = 10

def password_gen(lenght=16):
    letters = string.ascii_lowercase+string.ascii_uppercase + string.digits + string.punctuation
    return ''.join(random.choice(letters) for i in range(lenght))

for i in range(1,AMOUNT+1):
    print(password_gen())
    





# for i in range(1,AMOUNT):
    # a = Account.objects.create_user(email='test2@mail.com',first_name='test2',last_name='lastname',password='thisispassword1367')
    # pass