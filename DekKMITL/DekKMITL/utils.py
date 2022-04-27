import string
import random

from unidecode import unidecode
from django.utils.text import slugify


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_slug_generator(instance, new_slug=None):
    """
    This is for a Django project and it assumes your instance 
    has a model with a slug field and a title character (char) field.
    """
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(unidecode(instance.title))

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists or slug == '':
        new_slug = "{slug}-{randstr}".format(
            slug=slug,
            randstr=random_string_generator(size=4)
        )
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug

def sort_queryset_by_key(qs,key,reverse=True,amount=None):
    items_dict = {}
    # generate pair of key and comparing value
    for instance in qs:
        items_dict[instance.pk] = key(instance)

    sort_orders = sorted(items_dict.items(), key=lambda x: x[1], reverse=reverse)
    Klass = instance.__class__
    result_qs = []
    for k,v in sort_orders:
        result_qs.append(Klass.objects.get(pk=k))
        
    if amount is not None:
        result_qs = result_qs[:amount]

    return result_qs