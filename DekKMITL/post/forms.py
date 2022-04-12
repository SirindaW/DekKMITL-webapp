from django import forms
from .models import Post,Comment

class PostForm(forms.ModelForm):
    
    title = forms.CharField(
        label='' ,
        widget=forms.TextInput(attrs={
            'placeholder': 'Title...'
        })
    )
    
    content = forms.CharField(
        label='' ,
        widget=forms.Textarea(attrs={
            'placeholder': 'Say something...'
        })
    )

    class Meta:
        model= Post
        fields = ['title','content']

