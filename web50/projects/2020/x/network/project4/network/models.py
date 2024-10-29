



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


    def serialize(self):
        return {
            "postid": self.postid,
            "username": self.userid.username,
            "userid":self.userid.id,
            "postcontent": self.postcontent,
            "likes": self.likes,
            "timestamp": self.datetim.strftime("%b %d %Y, %I:%M %p"),
        }

    def __str__(self):
        return f"user id {self.userid} created {self.postid} with {self.postcontent} at {self.datetim}"
    

class likelist(models.Model):
    likelistid= models.AutoField(primary_key=True)
    userid= models.ForeignKey(User,on_delete=models.CASCADE,related_name="userlikelist")
    postid = models.ForeignKey(Post,on_delete=models.CASCADE,related_name="postlikelist")
    
    class Meta:
        unique_together = ('userid', 'postid')

    def __str__(self):
        return f"{self.watchlistid} created by {self.userid} with lisitng {self.listingid}"