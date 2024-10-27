from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import json
from .models import User,Post
from django.utils import timezone
from django import forms
import time
from django.http import JsonResponse

from django.core.paginator import Paginator


#class NewPost(forms.Form):
#    title = forms.Textarea()

def index(request):

    if request.method != 'POST':

        start = int(request.GET.get("start") or 0)
        end = int(request.GET.get("end") or (start + 19))

        page = int(request.GET.get("page") or 1)
        data = []
        for i in range(start, end + 1):
            data.append(f"Post #{i}")


        # Artificially delay speed of response
        time.sleep(1)
        paginator = Paginator(data, 5)
        page_obj = paginator.get_page(page)
        print(paginator.page(1).object_list)

        print(page_obj)

        # Return list of posts
        """
        return JsonResponse({
            "posts": page_obj.object_list,
        })
        """

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
