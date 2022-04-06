from time import timezone
from django.db import models

from account.models import Account
# from taggit.managers import TaggableManager

# Create your models here.
class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=200,unique=True,default='')
    
    def __str__(self): 
        return self.title
    
    
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True,blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    post_likes = models.PositiveIntegerField(default=0,null=False)
    post_fav = models.PositiveBigIntegerField(default=0,null=False)
    slug = models.SlugField(unique=True,max_length=300)
    author = models.ForeignKey(Account,on_delete=models.models.CASCADE)
    # tags = TaggableManager()
