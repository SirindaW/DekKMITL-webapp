from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages

from account.forms import RegistrationForm, LoginForm, ProfileEditForm
from .models import Account


def profile_view(request,user_id=None,*args, **kwargs):

    if not request.user.is_authenticated:
        return redirect('login_view')

    if user_id is None:
        instance = request.user
    else:
        instance = get_object_or_404(Account,id=user_id)
        # account = Account.objects.get(id=user_id)

    context = {
        'instance':instance,
    }
    return render(request,'account/profile.html',context)

def toggle_follow_view(request,user_id):
    user = get_object_or_404(Account,id=user_id)
    request.user.toggle_follow(user)
    print("TOGGLE")
    return redirect(user.get_absolute_url())
    
def logout_view(request, *args, **kwargs):
    logout(request)
    # messages.success(request,'You have been logged out.')
    return redirect("login_view")


def login_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        # messages.info(request, "You are already logged in.")
        return redirect("home_view")

    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            raw_password = form.cleaned_data.get("password")
            user = authenticate(email=email, password=raw_password)
            if user:
                login(request, user)  # Login the user
                # messages.success(request,"Logged in successfully.")
                return redirect("home_view")
            else:
                messages.error(request,"Invalid Login.")
                form = LoginForm() 
        else:
            messages.error(request,"Invalid Login.")
            form = LoginForm() 

    else:
        form = LoginForm()

    context = {"form": form}
    return render(request, "account/login.html", context)


def register_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        # messages.info(request, "You are already logged in.")
        return redirect("home_view")
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()  # Create the account
            email = form.cleaned_data.get("email")
            raw_password = form.cleaned_data.get("password1")
            account = authenticate(email=email, password=raw_password)
            login(request, account)  # Login the user
            # messages.success(
                # request, f'Account created for {form.cleaned_data.get("email")}.'
            # )
            return redirect("home_view")
    else:
        form = RegistrationForm()

    context = {"form": form}

    return render(request, "account/register.html", context)

def profile_edit_view(request):
    form = ProfileEditForm(instance=request.user)    
    if request.method == "POST": 
        form = ProfileEditForm(request.POST,instance=request.user) 
        if form.is_valid():        
            form.save()
            return redirect(request.user.get_absolute_url())

    context = {
        'form':form,
    }
    return render(request,'account/profile_edit.html',context)

def profile_edit_password_view(request):
    context = {}
    return render(request,'account/password_edit.html',context)
    