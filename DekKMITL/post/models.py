from django.db import models


from account.models import Account

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=1200)
    date_created = models.DateTimeField(auto_now_add=True,blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    post_likes = models.PositiveIntegerField(default=0,null=False)
    post_fav = models.PositiveBigIntegerField(default=0,null=False)
    slug = models.SlugField(unique=True,max_length=300)
    author = models.ForeignKey(Account,blank=True,null=True,on_delete=models.CASCADE)

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