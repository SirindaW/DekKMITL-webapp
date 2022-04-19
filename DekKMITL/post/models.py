from django.db import models
from django.contrib import admin
from django.urls import reverse
from django.db.models.signals import pre_save
from DekKMITL.utils import unique_slug_generator
from datetime import timezone,datetime,timedelta
from django.utils.timesince import timeuntil


from account.models import Account

class PostActiveManager(models.Manager):
    def get_queryset(self):
        all_ = super().get_queryset()
        active_posts = [post for post in all_ if post.is_active]
        return active_posts
    

class Post(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=4000)
    date_created = models.DateTimeField(auto_now_add=True,blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(Account,related_name='post_likes',null=True,blank=True)
    # post_fav = models.PositiveBigIntegerField(default=0,null=False)
    views = models.PositiveIntegerField(null=True,blank=True,default=0)
    slug = models.SlugField(unique=True,max_length=300,blank=False)
    author = models.ForeignKey(Account,blank=True,null=True,on_delete=models.CASCADE,related_name='post')
    room = models.ForeignKey('post.Room',on_delete=models.NULL,null=True,blank=True,related_name='post')
    tag = models.ForeignKey('post.Tag',on_delete=models.NULL,null=True,blank=True,related_name='post')

    expire_date = models.DateTimeField(null=True,blank=True,default=None)
    is_expirable = models.BooleanField(null=True,blank=True,default=False)
    
    # active_posts = PostActiveManager()
    objects=models.Manager()
    
    
    @admin.display(boolean=True)
    def is_expired(self):
        if self.is_expirable:
            now = datetime.now(timezone.utc)
            diff = now - self.expire_date
            if diff > timedelta(0):
                # exipired
                return True

        # never expired
        return False

    @admin.display(boolean=True)
    def is_active(self):
        if self.is_expired() :
            print(self.title)
            return False
        return True
    
    def time_until_expired(self):
        if not self.is_expirable:
            return None
        return timeuntil(self.expire_date)
        

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self):
        return reverse("post:details_view", kwargs={"post_slug": self.slug})
    

class Room(models.Model):
    title = models.CharField(max_length=200)
    # related_name = ['Room.post']

    def __str__(self) -> str:
        return self.title

class Tag(models.Model):
    title = models.CharField(max_length=200)
    # related_name = ['Tag.post']

    def __str__(self) -> str:
        return self.title
        
class Comment(models.Model):
    post= models.ForeignKey(Post,blank=True,null=True,on_delete=models.CASCADE)
    content = models.TextField(max_length=1200)
    author = models.ForeignKey(Account,blank=True,null=True,on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True,blank=True)
    comment_likes = models.PositiveIntegerField(default=0,null=False)
    replies = models.ForeignKey('post.Comment',blank=True,null=True,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"comment id_{self.id} : " + str(self.post)

# https://www.youtube.com/watch?v=d5LYM3C_A98
def slug_generator(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(slug_generator,sender=Post)