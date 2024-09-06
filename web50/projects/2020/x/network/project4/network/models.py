



from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
from django.utils import timezone


class User(AbstractUser):
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    


class Post(models.Model):
    postid = models.AutoField(primary_key=True)
    userid = models.ForeignKey(User,on_delete=models.CASCADE,related_name="userPost")
    postcontent = models.TextField()
    
    datetim = models.DateTimeField(default=timezone.now, null=True, blank=True)

    likes = models.IntegerField(default=0)

    def __str__(self):
        return f"user id {self.userid} created {self.postid} with {self.postcontent} at {self.datetim}"
    
