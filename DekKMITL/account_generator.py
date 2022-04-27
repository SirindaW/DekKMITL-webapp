from account.models import Account
import json
import string
import random
import names

def password_gen(lenght=16):
    letters = string.ascii_lowercase+string.ascii_uppercase + string.digits + string.punctuation
    return ''.join(random.choice(letters) for _ in range(lenght))

def email_gen(name,domainname='mail.com'):
    number = random.randint(1000,9999)
    return name.lower()+str(number)+'@'+domainname.lower()


def generate_accounts_to_json(amount=10,file_name='dummy_account.json'):
    accounts = []

    for i in range(1,amount+1):
        first_name = names.get_first_name()
        last_name = names.get_last_name()
        email = email_gen(name=first_name,domainname='kmitl.ac.th')
        password = password_gen()

        account = {
            'email':email,
            'first_name':first_name,
            'last_name':last_name,
            'password':password,
        } 

        accounts.append(account)

    dmp = json.dumps(accounts)

    with open(file_name,'w') as file:
        file.write(dmp)
        print(f"{len(dmp)} wrote to {file_name}")

def register_accounts_from_json(file='dummy_account.json'):
    with open(file,'r') as file:
        content = file.read()
    accounts = json.loads(content) 
    for account in accounts:
        email = account.get('email')
        first_name = account.get('first_name')
        last_name = account.get('last_name')
        password = account.get('password')

        Account.objects.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )