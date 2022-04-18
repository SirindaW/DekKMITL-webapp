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

