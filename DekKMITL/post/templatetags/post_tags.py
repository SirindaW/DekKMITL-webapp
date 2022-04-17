from django import template
from django.shortcuts import get_object_or_404

from ..models import Post

# https://www.youtube.com/watch?v=0jAw5Qb9fg0 Create Custom Template Tags

register = template.Library()

@register.simple_tag
def total_posts():
    return Post.objects.count()

@register.simple_tag
def like_status(request,pk,*args,**kwargs):
    post = get_object_or_404(Post,id=pk)
    if post.likes.filter(id=request.user.id).exists():
        status = True
    else:
        status = False
    return status

@register.filter
def post_list(user):
    posts = user.post.order_by('-date_created')
    return posts