from django.shortcuts import get_object_or_404, render, redirect,reverse
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages

# For send_activation_email
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes,force_str,force_text,DjangoUnicodeDecodeError
from DekKMITL.utils import generate_token
from django.core.mail import EmailMessage
from django.conf import settings


from account.forms import RegistrationForm, LoginForm
from .models import Account

def send_activation_email(user,request):
    current_site = get_current_site(request)
    email_subject = "Activate your account"
    email_body = render_to_string('account/email_activation.html',
                                  {
                                    'user':user,
                                    'domain':current_site,
                                    'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                                    'token':generate_token.make_token(user),
                                  }
                                  )

    email = EmailMessage(subject=email_subject,body=email_body,from_email=settings.EMAIL_FROM_USER,to=[user.email])
    email.send()


def activate_user_view(request,uidb64,token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Account.objects.get(pk=uid)

    except Exception as e:
        user = None

    if user and generate_token.check_token(user,token):
        user.is_email_verified = True
        user.save()

        messages.add_message(request,messages.SUCCESS,'Email verified, you can login.')
        return redirect(reverse('login_view'))

    return render(request,'account/email_activation_failed.html',{'user':user})     
    

def profile_view(request,user_id=None,*args, **kwargs):

    if not request.user.is_authenticated:
        return redirect('login_view')

    if user_id is None:
        account = request.user
    else:
        account = get_object_or_404(Account,id=user_id)
        # account = Account.objects.get(id=user_id)

    context = {
        'account':account,
    }
    return render(request,'account/profile.html',context)
    
def logout_view(request, *args, **kwargs):
    logout(request)
    # messages.success(request,'You have been logged out.')
    return redirect("home_view")


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

            if not user.is_email_verified:
                # Your email is not verified, please check your email
                messages.error(request,'Your email is not verified, please check your email.')
                context = {}
                return render(request,'account/login.html',context)

            if user:
                login(request, user)  # Login the user successfully
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

            ### Automatically login when registered
            # email = form.cleaned_data.get("email")
            # raw_password = form.cleaned_data.get("password1")
            # account = authenticate(email=email, password=raw_password)
            # login(request, account)  # Login the user

            return redirect("login_view")
    else:
        form = RegistrationForm()

    context = {"form": form}

    return render(request, "account/register.html", context)
