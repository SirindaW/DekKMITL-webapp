# Welcome to DekKMITL!
DekKMITL-webapp
Software Development Project (Y2/2)
Computer Engineering KMITL

DekKMITL is web blog application that helps you in contact with KMITL community.


# Installation
You can follow these steps to install the demo project.

## Install Pipenv

**Pipenv** is a tool that automatically creates and manages a virtualenv for your projects. 
If you already have Python and pip, you can easily install Pipenv into your home directory:
`$ pip install --user pipenv`
Or, if you’re using Fedora 28:
`$ sudo dnf install pipenv`
It’s possible to install Pipenv with Homebrew on MacOS, or with Linuxbrew on Linux systems. However,  **this is now discouraged**, because updates to the brewed Python distribution will break Pipenv, and perhaps all virtual environments managed by it. You’ll then need to re-install Pipenv at least. If you want to give it a try despite this warning, use:
`$ brew install pipenv`

More detailed installation instructions can be found in the  [☤ Installing Pipenv](https://pipenv.pypa.io/en/latest/install/#installing-pipenv)  chapter.

## Install the requirements 
This project is using Django as a framework as well as a bundle of packages. Easily use pipenv to install the requirements. Note that requirements.txt is in the DekKMITL-webapp\DekKMITL directory.

`pipenv install -r requirements.txt`

activate the Pipenv shell
`pipenv shell`
#### Migrate and setup the Database
` python manage.py makemigrations`
    
`python manage.py migrate`

Starts the Django Python interactive interpreter
`python manage.py shell`
  
 Run the dbsetup script
`exec(open('dbsetup.py').read())`
exit the shell
`exit()`
## Runserver
runserver
`python manage.py runserver`
    
#### Create admin account with superuser
`python manage.py createsuperuser`

#### Open with browser in localhost 
`http://127.0.0.1:8000/`
