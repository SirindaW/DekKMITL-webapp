from django.db import models
from post.models import Post
from account.models import Account


class PostReport(models.Model):
    post = models.ForeignKey(to=Post,on_delete=models.CASCADE,related_name='reports')
    reporter = models.ForeignKey(to=Account,on_delete=models.CASCADE,related_name='reported_posts')
    date_reported = models.DateTimeField(auto_now_add=True)


    def __str__(self) -> str:
        return f'Reporter : {self.reporter} -> {self.post}'

    