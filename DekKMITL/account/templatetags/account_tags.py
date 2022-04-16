from django import template
from django.shortcuts import get_object_or_404

from ..models import Account

# https://www.youtube.com/watch?v=0jAw5Qb9fg0 Create Custom Template Tags

register = template.Library()


@register.simple_tag
def is_following(request,pk,*args,**kwargs):
    # Not yet implemented
    return False
