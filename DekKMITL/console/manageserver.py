import os
from re import sub
import subprocess
import signal


# def runserver():
#     os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DekKMITL.settings")
#     from django.core.management import call_command
#     from django.core.wsgi import get_wsgi_application 
#     application = get_wsgi_application()
#     call_command('runserver',  '127.0.0.1:8000')

global server_pid

subproc = list()
command = ''
while True:
    command = input('console> ') 

    if command.lower() in ['run','start']:
        # prog = subprocess.Popen('start /wait python manage.py runserver', shell=True)
        proc = subprocess.Popen('runserver.bat',shell=True)
        subproc.append(proc)
        print(proc.pid)
        
    if command.lower() in ['migrate','mg']:
        prog = subprocess.Popen('migrate.bat',shell=True)
        # os.system('start cmd /k python manage.py migrate')
        subproc.append(prog)
        print(prog.pid)

    if command.lower() in ['stop',]:
        for proc in subproc:
            print(f'killing {proc.pid}')
            proc.kill()
            # os.kill(proc.pid, signal.CTRL_C_EVENT)

    if command.lower() in ['restart',]:
        proc = subprocess.Popen('py manageserver.py')

    if command.lower() == 'exit':
        print("exit ")
        exit()

    if command.lower() == 'proc':
        print('processes running : [\n')
        for proc in subproc:
            if proc.returncode == 0:
                subproc.remove(proc)
        for proc in subproc:
            print(proc)
        print('\n]')






