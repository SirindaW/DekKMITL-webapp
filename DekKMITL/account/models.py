from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.urls import reverse

# Account Model


class AccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **other_fields):
        """
        Creates and saves a User with the given infos
        """
        if not email:
            raise ValueError("Users must have an email address")

        if not first_name:
            raise ValueError("Users must have a first name")

        if not email:
            raise ValueError("Users must have a last name")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, first_name, last_name, password=None, **other_fields
    ):
        """
        Creates and saves a SuperUser with the given infos
        """
        user = self.create_user(
            email,
            first_name,
            last_name,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

def get_profile_image_filepath(self,*args,**kwargs):
    return f'profile_image/{self.pk}/profile_image.png'

def get_default_profile_image():
    return "account/default_profile_image.png"

class Account(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )

    first_name = models.CharField(max_length=200, default="")
    last_name = models.CharField(max_length=200, default="")
    date_registered = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    bio = models.TextField(blank=True, max_length=500)
    profile_image = models.ImageField(max_length=255, upload_to=get_profile_image_filepath, null=True, blank=True, default=get_default_profile_image)
    hide_email = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]


    def __str__(self) -> str:
        return str(self.first_name) + " " +str(self.last_name)

    def get_absolute_url(self):
        return reverse("profile_view", kwargs={"user_id": self.id})
    

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
