import string
import random

from django.utils.text import slugify

# For send_activation_email
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

class TokenGenerator(PasswordResetTokenGenerator)
    def _make_hash_value(self,user,timestamp):
        return six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_email_verified)

generate_token = TokenGenerator()


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
        slug = slugify(instance.title)

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        new_slug = "{slug}-{randstr}".format(
            slug=slug,
            randstr=random_string_generator(size=4)
        )
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug