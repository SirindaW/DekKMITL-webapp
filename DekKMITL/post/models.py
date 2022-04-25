from django.db import models
from django.contrib import admin
from django.urls import reverse
from django.db.models.signals import pre_save,post_delete
from DekKMITL.utils import unique_slug_generator
from datetime import timezone,datetime,timedelta
from django.utils.timesince import timeuntil
from django.db.models import Q
from django.apps import apps

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
    # custom cover image
    self.is_cover_image_default = False    
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
    is_cover_image_default = models.BooleanField(default=True)
    room = models.ForeignKey('post.Room',on_delete=models.SET_NULL,null=True,blank=True,related_name='post')
    tag = models.ManyToManyField('post.Tag',related_name='posts',blank=True)
    expire_date = models.DateTimeField(null=True,blank=True,default=None)
    is_expirable = models.BooleanField(null=True,blank=True,default=False)

    ### Tag ###
    # to get all tags from a particular post use post.tag.all()
    # to get all posts from a particular tag use Post.objects.filter(tag__title='tagname')
    
    # active_posts = PostActiveManager()
    objects = PostManager()
    
    ### Comment ###
    # post.comments.all() -> QuerySet of comments on that post
    # 

    def get_comments(self):
        return self.comments.all().order_by('-date_created')
    
    def total_comments(self):
        return self.comments.all().count()        

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

    def get_absolute_url(self):
        return reverse("post:details_view", kwargs={"post_slug": self.slug})
    
    def get_delete_url(self):
        return reverse("post:delete_view",kwargs={'post_slug':self.slug})

    def __str__(self) -> str:
        return self.title
    
def get_room_icon_file_path(self,*args,**kwargs):
    return f'room_icon/{self.title}.png'
class Room(models.Model):
    title = models.CharField(max_length=200,unique=True)
    room_id = models.IntegerField(default=0,unique=True)
    icon = models.ImageField(null=True,upload_to=get_room_icon_file_path)
    verbose = models.CharField(max_length=200,null=True,blank=True)
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
    title = models.CharField(max_length=200,unique=True)
    # related_name = ['tag.posts']

    def get_hx_latest_post(self):
        return reverse('post:hx_tag_detail',kwargs={'tag_name':self.title,'status':'latest'})

    def get_hx_temp_post(self):
        return reverse('post:hx_tag_detail',kwargs={'tag_name':self.title,'status':'temp'})

    def get_post(self):
        posts = Post.objects.filter(tag__title=self.title)
        return posts

    def get_absolute_url(self):
        return reverse('post:tag_detail_view', kwargs={"tag": self.title})
    
    def __str__(self) -> str:
        return self.title
        
class Comment(models.Model):
    post = models.ForeignKey(Post,related_name='comments',on_delete=models.CASCADE) 
    content = models.TextField(max_length=1000)
    author = models.ForeignKey(Account,related_name='comments',on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def get_like_toggle_url(self):
        return reverse('post:comment_like_toggle_view',kwargs={'id':self.pk})

    def is_liked_by(self,user):
        return self.likers.all().filter(liker=user).exists()

    def _like(self,user):
        if self.is_liked_by(user):
            return False
        cml = CommentLike(liker=user,comment=self)
        return cml.save()

    def _unlike(self,user):
        if not self.is_liked_by(user):
            return False
        cml = CommentLike.objects.get(liker=user,comment=self)
        return cml.delete()
    
    def toggle_like(self,user):
        if self.is_liked_by(user):
            return self._unlike(user)
        else:
            return self._like(user)

    def total_likes(self):
        return self.likers.all().count()

    ### CommentLiker ###
    # comment.likers.all()
    # def liker(self):
    #     cms = CommentLike.objects.filter(comments=self)
    #     return cms.values_list('liker',flat=True)

    def __str__(self) -> str:
        return f'Comment by {self.author} on {self.post}'

class CommentLike(models.Model):
    liker=models.ForeignKey(Account,related_name='liked_comments',on_delete=models.CASCADE)
    comment=models.ForeignKey(Comment,related_name='likers',on_delete = models.CASCADE) 
    date_created=models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f'{self.liker} liked {self.comment}'

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