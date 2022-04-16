from django import template
from django.shortcuts import get_object_or_404

# https://www.youtube.com/watch?v=0jAw5Qb9fg0 Create Custom Template Tags

register = template.Library()

@register.simple_tag
def total_followers(user):
    return user.followers().count()

@register.simple_tag
def total_followings(user):
    return user.followings().count()

@register.filter
def is_following(request, user):
    return request.user.is_following(user)

@register.filter
def toggle_follow_url(request, user):
    return request.user.is_following(user)