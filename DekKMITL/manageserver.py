import os
import subprocess
from signal import SIGINT


# def runserver():
#     os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DekKMITL.settings")
#     from django.core.management import call_command
#     from django.core.wsgi import get_wsgi_application 
#     application = get_wsgi_application()
#     call_command('runserver',  '127.0.0.1:8000')

global server_pid

while True:
    command = input('> ') 

    if command.lower() == 'run':
        prog = subprocess.Popen('start /wait python manage.py runserver', shell=True)
        # server_pid = 
        print(prog.pid)





