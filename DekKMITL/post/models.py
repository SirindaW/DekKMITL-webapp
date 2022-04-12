from django.db import models
from django.urls import reverse
from django.db.models.signals import pre_save
from DekKMITL.utils import unique_slug_generator


from account.models import Account

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=1200)
    date_created = models.DateTimeField(auto_now_add=True,blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(Account,related_name='post_likes')
    post_fav = models.PositiveBigIntegerField(default=0,null=False)
    views = models.PositiveIntegerField(null=True,blank=True,default=0)
    slug = models.SlugField(unique=True,max_length=300)
    author = models.ForeignKey(Account,blank=True,null=True,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self):
        return reverse("post:details_view", kwargs={"post_slug": self.slug})
    

        
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