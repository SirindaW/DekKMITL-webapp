from cProfile import label
from dataclasses import field
from django import forms
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import authenticate
from django.contrib import messages

from account.models import Account

class LoginForm(forms.ModelForm):
    password = forms.CharField(label='Password',widget=forms.PasswordInput)
    
    class Meta:
        model = Account
        fields = ('email','password',)

    def clean(self):
        if self.is_valid():
            email = self.cleaned_data['email']
            password = self.cleaned_data['password']
            # if not authenticate(email=email, password=password):
            #     raise forms.ValidationError(
            #         'Either your login email or password is incorrect.')

class RegistrationForm(UserCreationForm):
    """
    A form that creates a user, with no privileges, from the given email and
    password.
    """

    email = forms.EmailField(
        max_length=255, help_text="Required. Add a valid email address."
    )

    class Meta:
        model = Account
        fields = ("email", 'first_name','last_name', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data[
            "email"
        ].lower()  # 'email' has to be matched in the html input name='email'

        # Check if account already exist
        try:
            account = Account.objects.get(email=email)
        except:
            return email
        raise forms.ValidationError(f"Account with email {email} is already existed.")

class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ('first_name','last_name','bio')

        widgets = {
            'first_name': forms.TextInput(attrs={'class':'info-input', 'name':'first_name', 'id':'inputFirstname', 'placeholder':'ระบุชื่อจริง', }),
            'last_name': forms.TextInput(attrs={'class':'info-input', 'name':'last_name', 'id':'inputLastname', 'placeholder':'ระบุนามสกุล', }),
            'bio': forms.TextInput(attrs={ 'class':'info-input', 'type':'text', 'name':'bio', 'id':'inputBio', 'placeholder':'ระบุคำอธิบายตัวเอง', }),
        }

    # def save(self, commit=True):
        
    #     self.instance.first_name = self.cleaned_data['first_name']
    #     self.instance.last_name = self.cleaned_data['last_name']
    #     self.instance.bio= self.cleaned_data['bio']
    #     if commit:
    #         self.instance.save()        
    #     return self.instance



















    