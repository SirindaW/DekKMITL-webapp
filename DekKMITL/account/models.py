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

class AccountFollowing(models.Model):
    fp = models.ForeignKey('account.Account',on_delete=models.CASCADE,blank=True,null=True,related_name='x')
    sp = models.ForeignKey('account.Account',on_delete=models.CASCADE,blank=True,null=True,related_name='y')
    date_created = models.DateTimeField(auto_now_add=True,null=True,blank=True)

    def __str__(self) -> str:
        return f'{str(self.fp)} - follows - {str(self.sp)}'


def get_profile_image_filepath(self,*args,**kwargs):
    return f'profile_image/{self.pk}/profile_image.png'

def get_cover_image_filepath(self,*args,**kwargs):
    # same dir as profile image
    return f'profile_image/{self.pk}/cover_image.png'

def get_default_profile_image():
    return "account/default_profile_image.svg"

def get_default_cover_image():
    return "account/defaultcover.svg"

class Account(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )

    first_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50, default="")
    date_registered = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    bio = models.TextField(blank=True, max_length=160)
    profile_image = models.ImageField(max_length=255, upload_to=get_profile_image_filepath,   default=get_default_profile_image)
    cover_image = models.ImageField(max_length=255, upload_to=get_cover_image_filepath,   default=get_default_cover_image)
    hide_email = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def get_absolute_url(self):
        return reverse("profile_account_view", kwargs={"user_id": self.id})

    def get_profile_image_url(self):
        return self.profile_image.url
    
    def get_cover_image_url(self):
        return self.cover_image.url

    def get_follower_list_url(self):
        return reverse('account:follower_list_view',kwargs={'user_id':self.pk})
    
    def get_following_list_url(self):
        return reverse('account:following_list_view',kwargs={'user_id':self.pk})

    def followings(self):
        table = AccountFollowing.objects.filter(fp=self) 
        user_ids = table.values_list('sp',flat=True)
        followings_ = Account.objects.filter(pk__in=user_ids)
        return followings_

    def followers(self):
        table = AccountFollowing.objects.filter(sp=self) 
        user_ids = table.values_list('fp',flat=True)
        followers_ = Account.objects.filter(pk__in=user_ids)
        return followers_

    def total_followings(self):
        return self.followings().count()

    def total_followers(self):
        return self.followers().count()

    def is_following(self,user):
        return user in self.followings() 

    def is_followed_by(self,user):
        return self in user.followers() 

    def follow(self,user=None):
        if self.id == user.id:
            # Cannot follow yourself
            return False
        if self.is_following(user):
            # Already followed
            return False
        instance = AccountFollowing(fp=self,sp=user)
        instance.save()
        return instance

    def unfollow(self,user=None):
        if not self.is_following(user):
            # Not currently following
            return False
        instance = AccountFollowing.objects.get(fp=self,sp=user)
        return instance.delete()

    def unfollow_all(self):
        instance = AccountFollowing.objects.filter(fp=self)
        return instance.delete()

    def toggle_follow(self,user):
        if self.is_following(user):
            return self.unfollow(user)
        else:
            return self.follow(user)

    def get_toggle_follow_url(self):
        return reverse('account:toggle_follow_view',kwargs={'user_id':self.id})

    def get_all_post(self):
        from post.models import Post
        return Post.objects.filter(author=self).order_by('-date_created')

    def get_active_post(self):
        from post.models import Post
        return Post.objects.active().filter(author=self).order_by('-date_created')

    def __str__(self) -> str:
        return str(self.first_name) + " " +str(self.last_name)

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
