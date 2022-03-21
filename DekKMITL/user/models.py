from django.db import models

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=254,verbose_name='Email')
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    birth_date = models.DateTimeField(auto_now=False,auto_now_add=False)
    
    def __str__(self):
        return str(self.firstname) + " " + str(self.lastname)
    
