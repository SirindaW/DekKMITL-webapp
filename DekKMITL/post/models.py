from django.db import models
from django.contrib import admin
from django.urls import reverse
from django.db.models.signals import pre_save,post_delete
from DekKMITL.utils import unique_slug_generator
from datetime import timezone,datetime,timedelta
from django.utils.timesince import timeuntil
from django.db.models import Q

from account.models import Account

class PostManager(models.Manager):
    def all(self):
        return super().get_queryset()

    def active(self):
        qs = super().get_queryset()
        active_posts = [post for post in qs if post.is_active]

        active_posts = Post.objects.none()
        for obj in qs:
            if obj.is_active():        
                active_posts |= Post.objects.filter(slug=obj.slug)

        return active_posts

    def search(self,query):
        lookups = Q(title__icontains=query) | Q(author__first_name__icontains=query) | Q(author__last_name__icontains=query) | Q(content__icontains=query) | Q(slug__icontains=query)
        qs = super().get_queryset().order_by('-date_created').filter(lookups)
        return qs

    

def get_cover_image_filepath(self,*args,**kwargs):
    return f'post_cover_image/{self.slug}/post_cover_image.png'

def get_default_cover_image():
    return "post/defaultcover.svg"

class Post(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=4000)
    date_created = models.DateTimeField(auto_now_add=True,blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    liker = models.ManyToManyField(Account,related_name='post_liked',null=True,blank=True)
    views = models.PositiveIntegerField(null=True,blank=True,default=0)
    slug = models.SlugField(unique=True,max_length=300,blank=False)
    author = models.ForeignKey(Account,blank=True,null=True,on_delete=models.CASCADE,related_name='post')
    cover_image = models.ImageField(max_length=255, upload_to=get_cover_image_filepath, default=get_default_cover_image)
    room = models.ForeignKey('post.Room',on_delete=models.SET_NULL,null=True,blank=True,related_name='post')
    tag = models.ManyToManyField('post.Tag',related_name='posts',blank=True)
    expire_date = models.DateTimeField(null=True,blank=True,default=None)
    is_expirable = models.BooleanField(null=True,blank=True,default=False)

    ### Tag ###
    # to get all tags from a particular post use post.tag.all()
    # to get all posts from a particular tag use Post.objects.filter(tag__title='tagname')
    
    # active_posts = PostActiveManager()
    objects = PostManager()
    
    
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
            return False
        return True
    
    def time_until_expired(self):
        if not self.is_expirable:
            return None
        return timeuntil(self.expire_date)
        
    def get_cover_image_url(self):
        return self.cover_image.url

    def get_like_toggle_url(self):
        return reverse('post:like_view',kwargs={'slug':self.slug})

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self):
        return reverse("post:details_view", kwargs={"post_slug": self.slug})
    

class Room(models.Model):
    title = models.CharField(max_length=200)
    room_id = models.IntegerField(default=0,unique=True)
    # related_name = ['Room.post']

    def get_hx_latest_post(self):
        return reverse('post:hx_room_detail',kwargs={'room_name':self.title,'status':'latest'})

    def get_hx_temp_post(self):
        return reverse('post:hx_room_detail',kwargs={'room_name':self.title,'status':'temp'})

    def get_absolute_url(self):
        return reverse("post:room_detail_view", kwargs={"room_name": self.title})
    

    def __str__(self) -> str:
        return self.title

class Tag(models.Model):
    title = models.CharField(max_length=200)
    # related_name = ['tag.posts']

    def get_post(self):
        posts = Post.objects.filter(tag__title=self.title)
        return posts

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

def check_remaining_post_in_tag(sender,instance,*args,**kwargs):
    # Delete the tag that does not have any post using.
    for tag in Tag.objects.all():
        if not Post.objects.filter(tag=tag).exists():
            tag.delete()
    

pre_save.connect(slug_generator,sender=Post)
post_delete.connect(check_remaining_post_in_tag,sender=Post)