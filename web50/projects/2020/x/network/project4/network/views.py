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
from django.contrib.auth.decorators import login_required

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
        
        data = json.loads(request.body)
        request_type = data.get('request_type')
        

        if request_type == 'addpost':


            print("add post assed")
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
            print(f"this is post data now: {post}")
            print(f"type of post is {type(post)}")
            postdat = post.serialize()
            print(f"This is postdata: {postdat}")
            print(f"type of postdat: {type(postdat)}")
            message= "Post added sucessfully."
            newpostcontext= {"message":message,"postdata":postdat}
            return JsonResponse(newpostcontext, status=200)    
    
        elif request_type== 'editpost':

            print("edit post request received in server")
            data = json.loads(request.body)
            post_id= data.get("post_id")
            print(f"This is form id {post_id}")
            post_text= data.get("post_text")
            print(f"This is post text {post_text}")

            user = request.user
            userid= request.user.id
            print(f"User who made this post is: {user}")
            print(f"ID of the user is: {userid}")
            #post = Post(userid=user,postcontent=post_text,datetim= timezone.now())
            try:
                post = Post.objects.get(postid=post_id)
                post.postcontent = post_text
                post.save()
            except:
                print("Error in database operations");
                return JsonResponse({
                "error": "Error in database operations try again."
                    }, status=400)   

                
            print(f"this is post data now: {post}")
            print(f"type of post is {type(post)}")
            postdat = post.serialize()
            print(f"This is postdata: {postdat}")
            print(f"type of postdat: {type(postdat)}")
            message= "Post edited sucessfully."
            newpostcontext= {"message":message,"postdata":postdat}
            return JsonResponse(newpostcontext, status=200)    
            
@login_required
def following(request):

    if request.method != 'POST':

        try:
            following_names= Followers.objects.filter(userBeta=request.user).values_list('userAlpha')
            #posts = Post.objects.all().order_by('-datetim')
            posts = Post.objects.filter(userid__in=following_names).order_by('-datetim')
            #print(posts)
        except Post.DoesNotExist:
            print("fetching from datbase not working")

        page = int(request.GET.get("page") or 1)
        

        postdat = [post.serialize() for post in posts]
        #print(postdat)


        paginator = Paginator(postdat, 10)
        page_obj = paginator.get_page(page)
        

        # Return list of posts
        

        return render(request, 'network/following.html', {"page_obj": page_obj})
        
        #return render(request, "network/index.html")
    
    







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

    if request.method == "POST":
        print("message received sucessfully")
        print(f"Username is {username} ")
        
       
        #print(f"user is {user}")
        
        
           
            
        data = json.loads(request.body)
        request_type = data.get('request_type')
        
        print("this is being executed")
        if request_type == 'addpost':

            print("add post assed")
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
            print(f"this is post data now: {post}")
            print(f"type of post is {type(post)}")
            postdat = post.serialize()
            print(f"This is postdata: {postdat}")
            print(f"type of postdat: {type(postdat)}")
            message= "Post added sucessfully."
            newpostcontext= {"message":message,"postdata":postdat}
            return JsonResponse(newpostcontext, status=200)   
        elif request_type== 'followUser':
            print("request for follwoing user received")
            try:
                user = User.objects.get(username=username)
                following_add = Followers(userBeta=request.user,userAlpha=user)
                following_add.save()
                print("request to add follower recieved")
            except:
                print("Error in database operations");
                return JsonResponse({
                "error": "Error in database operations try again."
                    }, status=400)
            return JsonResponse({
            "message": "Sucessfully follower added."
                }, status=200)
        

        elif request_type== 'removeFollow':
            print("request for request for removing user  follow received")
            
        
            try:
                user = User.objects.get(username=username)
                following_remove = Followers.objects.get(userBeta=request.user,userAlpha=user)
                following_remove.delete()
                print("follower removed from database sucessfully")
            except:
                print("Error in database operations");
                return JsonResponse({
                "error": "Error in database operations try again."
                    }, status=400)
            return JsonResponse({
            "message": "Sucessfully follower removed."
                }, status=200)
            



    
    else:
        print("unwanted is being executed")
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
       