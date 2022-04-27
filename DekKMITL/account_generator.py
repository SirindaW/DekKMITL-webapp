from account.models import Account
import json
import string
import random
import names

AMOUNT = 50

def password_gen(lenght=16):
    letters = string.ascii_lowercase+string.ascii_uppercase + string.digits + string.punctuation
    return ''.join(random.choice(letters) for _ in range(lenght))

def email_gen(name,domainname='mail.com'):
    return name.lower()+'@'+domainname.lower()


def generate_accounts_to_json(file_name='dummy_account.json'):
    accounts = []

    for i in range(1,AMOUNT+1):
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

def register_accounts(accounts):
    for account in accounts:
        email = account.get('email')
        first_name = account.get('first_name')
        last_name = account.get('last_name')
        password = account.get('password')

        Account.objects.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )