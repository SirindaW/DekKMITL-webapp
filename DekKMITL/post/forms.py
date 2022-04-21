from distutils.command.build_scripts import first_line_re
from random import choices
from django import forms
from .models import Post,Comment

class PostForm(forms.ModelForm):
    class Meta:
        model= Post
        fields = ['title','content','is_expirable','expire_date']
    
        widgets = {
            'title':forms.TextInput(attrs={
                'placeholder': 'ชื่อกระทู้',
            }),
            'content':forms.Textarea(attrs={
                'placeholder': 'เนื้อหา',
            }),

            'is_expirable':forms.CheckboxInput(attrs={
            }),

            'expire_date':forms.DateTimeInput(attrs={
                # 'data-target': '#datetimepicker1',
                'type':'date',
            }),

        }

class PostCreateForm(forms.ModelForm):

    tag_string = forms.CharField(widget=forms.TextInput(),required=False)
    class Meta:
        model = Post
        fields = ['title','content','tag_string','cover_image','is_expirable','expire_date']

    # CHOICES_ROOM = ['a','b','c'] 

    widgets = {
        'title':forms.Textarea(),
        'content':forms.Textarea(),
        # 'room':forms.RadioSelect(attrs={'name':'room'}),
        # 'tag':forms.TextInput(),
        'cover_image':forms.FileInput(),
        'is_expirable':forms.CheckboxInput(),
        'expire_date':forms.DateTimeInput(),
    }
