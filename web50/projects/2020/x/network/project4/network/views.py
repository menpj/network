from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import json
from .models import User,Post,Followers
from django.utils import timezone
from django import forms
import time
from django.http import JsonResponse

from django.core.paginator import Paginator
from django.db.models import Model


#class NewPost(forms.Form):
#    title = forms.Textarea()

def index(request):

    if request.method != 'POST':

        try:
            posts = Post.objects.all().order_by('-datetim')
            #print(posts)
        except Post.DoesNotExist:
            print("fetching from datbase not working")

        page = int(request.GET.get("page") or 1)
        

        postdat = [post.serialize() for post in posts]
        #print(postdat)


        paginator = Paginator(postdat, 10)
        page_obj = paginator.get_page(page)
        

        # Return list of posts
        

        return render(request, 'network/index.html', {"page_obj": page_obj})
        
        #return render(request, "network/index.html")
    else:
        print("message received sucessfully")

        data = json.loads(request.body)
        form_id= data.get("form_id")
        print(f"This is form id {form_id}")
        post_text= data.get("post_text")
        print(f"This is post text {post_text}")

        user = request.user
        userid= request.user.id
        print(f"User who made this post is: {user}")
        print(f"ID of the user is: {userid}")
        post = Post(userid=user,postcontent=post_text,datetim= timezone.now())
        post.save()
        return render(request, "network/index.html")    
        #return HttpResponseRedirect(reverse("index"))   







def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def userpage(request, username=None):
    
    if request.method != 'POST':
        print(f"Username is {username} ")
        try:
            #user= User.objects.filter(username=username)
            
            user = User.objects.get(username=username)
            print(f"user is {user}")
            posts = Post.objects.filter(userid=user).order_by('-datetim')

            #print(posts)
        except Post.DoesNotExist:
            print("fetching posts from datbase not working")
        except User.DoesNotExist:
            print(f"User {username} does not exist.")
            return render(request, 'network/UserNotFound.html', { "username":username})
            

        followers = Followers.objects.filter(userAlpha=user).count()
        following = Followers.objects.filter(userBeta=user).count()
        following_status=None
        if request.user.is_authenticated:
            try:
                following_status = Followers.objects.filter(userBeta=request.user,userAlpha=user).get()
                following_status = True
                print(f"user is following other guy {following_status}")
            except Followers.DoesNotExist:
                following_status=False
                print(f"user is not following other guy {following_status}")
            
            print(f" Number of follower is {followers}")
            print(f" Number of following is {following}")
            
        
        
        
        
            

        page = int(request.GET.get("page") or 1)
        

        
        postdat = [post.serialize() for post in posts]
        #print(postdat)


        paginator = Paginator(postdat, 10)
        page_obj = paginator.get_page(page)
        #print(paginator.page(1).object_list)

        #print(page_obj)

        # Return list of posts
        """
        return JsonResponse({
            "posts": page_obj.object_list,
        })
        """

        return render(request, 'network/profile.html', { "username":username, "page_obj": page_obj, "followers": followers, "following": following , 
                                                        "following_status":following_status})
        
        #return render(request, "network/index.html")
    else:
        print("message received sucessfully")
        print(f"Username is {username} ")

        data = json.loads(request.body)
        form_id= data.get("form_id")
        print(f"This is form id {form_id}")
        post_text= data.get("post_text")
        print(f"This is post text {post_text}")

        user = request.user
        userid= request.user.id
        print(f"User who made this post is: {user}")
        print(f"ID of the user is: {userid}")
        post = Post(userid=user,postcontent=post_text,datetim= timezone.now())
        post.save()
        return render(request, "network/profile.html")    