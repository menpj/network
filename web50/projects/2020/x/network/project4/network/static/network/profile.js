function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function like_post()
{
var like= document.querySelectorAll(".like_link");
like.forEach(function(post){
    post.addEventListener('click',function(event) {

        event.preventDefault();
        console.log("like link clicked");
        var id = this.getAttribute('data-id');
        var likeNo= this.getAttribute('data-likeNO');
        console.log(`Number of likes are ${likeNo}`)
        likeNo= parseInt(likeNo);
        //console.log(`Updated like number is ${likeNo}`)
        
        console.log('Data ID:', id);
        //console.log('Post ID:',this.id);
        var postelement = document.getElementById(id);
        const csrftoken = getCookie('csrftoken');
        fetch('/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "request_type":"likepost",
                    post_id: id,
                    
                }),
                credentials: 'same-origin'
                
                
            }).then(response => { if(response.status==200) {response.json().then(response_message =>{
                //var textarea = document.getElementById(id);
               // textarea.value = ''; // Clear the value
               //alert("Post liked sucessfully.")
                console.log(response_message);
                if(response_message.message== "Post liked sucessfully.")
                {
                    console.log("message received successfully");
                    //alert("Post Liked Successfully");

                    document.getElementById(`${id}-like`).style.display = 'none';
                    document.getElementById(`${id}-unlike`).style.display = 'inline-block';
                    document.getElementById(`${id}-likes`).innerHTML=`Likes: ${response_message.likes}`;

                }
                //alert("something crazy happening");
               
                
            }); }
        else {
            console.log("Error occured resubmit");
        } });

            
    });

});
}


function unlike_post()
{
    var unlike= document.querySelectorAll(".unlike_link");
unlike.forEach(function(post){
    post.addEventListener('click',function(event) {

        event.preventDefault();
        console.log("unlike link clicked");
        var id = this.getAttribute('data-id');
        var likeNo= this.getAttribute('data-likeNO');
        console.log(`Number of likes are ${likeNo}`)
        likeNo= parseInt(likeNo);
        //console.log(`Updated like number is ${likeNo}`)
        
        console.log('Data ID:', id);
        //console.log('Post ID:',this.id);
        var postelement = document.getElementById(id);
        const csrftoken = getCookie('csrftoken');
        fetch('/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "request_type":"unlikepost",
                    post_id: id,
                    
                }),
                credentials: 'same-origin'
                
                
            }).then(response => { if(response.status==200) {response.json().then(response_message =>{
                //var textarea = document.getElementById(id);
               // textarea.value = ''; // Clear the value
               //alert("Post liked sucessfully.")
                console.log(response_message);
                if(response_message.message== "Post unliked sucessfully.")
                {
                    console.log("message received successfully");
                    //alert("Post Unliked Successfully");

                    document.getElementById(`${id}-like`).style.display = 'inline-block';
                    document.getElementById(`${id}-unlike`).style.display = 'none';
                    document.getElementById(`${id}-likes`).innerHTML=`Likes: ${response_message.likes}`;

                }
                //alert("something crazy happening");
               
                
            }); }
        else {
            console.log("Error occured resubmit");
        } });

            
     });

});
}

function editlink_func()
{

    console.log("edit link function called");
    var edit= document.querySelectorAll(".edit_link");
    edit.forEach(function(post){
        post.addEventListener('click',function(event) {

            event.preventDefault();
            console.log("edit link clicked");
            var post = this.getAttribute('data-post');
            var id = this.getAttribute('data-id');
            console.log('Data Info:', post);
            console.log('Data ID:', id);
            //console.log('Post ID:',this.id);
            var postelement = document.getElementById(id);
            const csrftoken = getCookie('csrftoken');
            postelement.innerHTML=`<form name="new-post-forms" id="form-${id}" method="post">
            <input type="hidden" name="csrfmiddlewaretoken" value="${csrftoken}">
            <textarea name="postinput" class="form-control" id="compose-posts-${id}" required>${post}</textarea>
            <input type="submit" value="Post" class="btn btn-primary"/>
        </form>`;
        
        var form_name= document.getElementById(`form-${id}`);
        
            form_name.addEventListener('submit', function(event) {
        //document.getElementById('new-post-forms').addEventListener('submit', function(event) {
        
            event.preventDefault();
            // Your form submission logic here
            
            

            
            

            var formId = this.id;
            
            //console.log('Form with name ' + formName + ' was submitted');
            console.log('Form id is: ' + formId );
            console.log(`Post id is: form-${id}`);
            console.log("Nah testing jimbrutta");
            
            if (formId===`form-${id}`) {
                event.preventDefault();
                let post_text = document.querySelector(`#compose-posts-${id}`).value;
    
                console.log("Post text is " + post_text);
                console.log("User is Alan. Form ID is " + formId);
                fetch('/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "request_type":"editpost",
                        post_text: post_text,
                        post_id: id,
                        
                    }),
                    credentials: 'same-origin'
                    
                    
                }).then(response => { if(response.status==200) {response.json().then(response_message =>{
                    var textarea = document.getElementById('compose-post');
                    textarea.value = ''; // Clear the value
                    console.log(response_message);
                    if(response_message.message== "Post edited sucessfully.")
                    {
                        console.log("message received successfully");
                        alert("Post Edited Successfully");

                        
                        


                        //var post = document.createElement('div');
                        
                        var postdata= response_message.postdata;
                        //post.id = response_message.postdata.postid;
    

                        postelement.innerHTML=`<h4>${postdata.postcontent}</h2>
                        Posted by <a href="/user/${postdata.username}">${postdata.username}</a> with ID ${postdata.userid} on
                        ${postdata.timestamp}  ,  Likes: ${postdata.likes} 
                        , <a href='#' data-id=${postdata.postid} data-post="${postdata.postcontent}" class="edit_link" style="display: inline-block;">Edit</a>
                            <br><br>`;

                        /*post.innerHTML=  `
                            <h4>${postdata.postcontent}</h4>
                            Posted by <a href="/user/${postdata.username}">${postdata.username}</a> with ID ${postdata.userid} on
                            ${postdata.timestamp} , Likes: ${postdata.likes}
                            <br><br>
                        `;
                        var latestPostContainer = document.querySelector("#posts");
                        document.querySelector("#posts").insertBefore(post, latestPostContainer.firstChild);
                        */
                        editlink_func();
    
                    }
                    //alert("something crazy happening");
                   
                    
                }); }
            else {
                console.log("Error occured resubmit");
            } });
    
                
            }
            
    
    
            console.log('Form submitted!');
        }); 
        });

    });

}
    
    function add_post(contents) {
    
        // Create new post
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = contents;
    
        // Add post to DOM
        document.querySelector('#posts').append(post);
    };
    
    document.addEventListener('DOMContentLoaded', function() {
        
        /* var buttons = document.getElementsByName("following_button");

        // Add a click event listener to each button
        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                console.log("button clicked");
                alert("Button with name 'following_button' was clicked!");
            });
        });*/
        document.querySelectorAll('form').forEach(function(form) {
            form.addEventListener('submit', function(event) {
                var formId = this.id;
                console.log('Form with ID ' + formId + ' was submitted');
        
                if (formId == 'new-post-form') {
                    event.preventDefault();
                    let post_text = document.querySelector('#compose-post').value;
        
                    console.log("Post text is " + post_text);
                    console.log("User is Alan. Form ID is " + formId);
                    fetch('/user/postingfromprofile', {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "request_type":"addpost",
                            post_text: post_text,
                            form_id: formId,
                            
                        }),
                        credentials: 'same-origin'
                        
                        
                    }).then(response => response.json()).then(response_message =>{
                        var textarea = document.getElementById('compose-post');
                        textarea.value = ''; // Clear the value
                        console.log(response_message);
                        if(response_message.message== "Post added sucessfully.")
                        {
                            console.log("message received successfully");
                            alert("New Post Successfully Added");
                            var post = document.createElement('div');
                            
                            var postdata= response_message.postdata;
                            post.id = response_message.postdata.postid;

                            post.innerHTML=  `
                                <h4>${postdata.postcontent}</h4>
                                Posted by <a href="/user/${postdata.username}">${postdata.username}</a> with ID ${postdata.userid} on
                                ${postdata.timestamp} ,<span id="${postdata.postid}-likes">Likes: ${postdata.likes}</span>
                            , <a id="${response_message.postdata.postid}-like" href='#' data-id=${response_message.postdata.postid} data-likeNO=${response_message.postdata.likes} class="like_link" style="display: inline-block;">Like</a>
                           <a id="${response_message.postdata.postid}-unlike" href='#' data-id=${response_message.postdata.postid} data-likeNO=${response_message.postdata.likes} class="unlike_link" style="display: none;">Unlike</a>
                            , <a href='#' data-id=${postdata.postid} data-post="${postdata.postcontent}" class="edit_link" style="display: inline-block;">Edit</a>
                            <br><br>
                            `;
                            
                            var latestPostContainer = document.querySelector("#latest_post");
                            document.querySelector("#latest_post").insertBefore(post, latestPostContainer.firstChild);
                            editlink_func();
                            like_post();
                            unlike_post();

                        }
                        //alert("something crazy happening");
                       
                        
                    }); 
        
                    
                }
            });
        });

        
       //code for follow button was situated here
       const isAuthenticated = JSON.parse(document.getElementById('is_authenticated').textContent);
       const username = JSON.parse(document.getElementById('username').textContent);
       const profileusername = JSON.parse(document.getElementById('profileusername').textContent);

       console.log("testing button data");
       console.log(`${isAuthenticated} is status,  ${username} is username, ${profileusername} `);
       if(isAuthenticated==true && username!=profileusername)
       {
            console.log("different person follow button should be there");
            var button = document.getElementById("following_add");

            // Add a click event listener to the button
            button.addEventListener("click", function() {
            console.log("button clicked");
            //alert("Button with id 'following_add' was clicked!");
            
            //alert(`something else weird is  happening ${username} `);


                
            fetch(`/user/${profileusername}`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "request_type": "followUser",
                    "followingadd": true,
                    
                }),
                credentials: 'same-origin'
                
                
            }).then(response => {
                    if(response.status==200) {
                    response.json().then(response_message =>{
                    //var followadd = document.getElementById('following_add');
                    //var followremove = document.getElementById('following_remove');
    
                    //followremove.style.display = 'block';
                    //followingadd.style.display = 'none';
                    
                    document.getElementById('following_add').style.display = 'none';
                    document.getElementById('following_remove').style.display = 'block';
                    
    
    
    
                    
    
                    /*
                    textarea.value = ''; 
                    console.log(response_message);
                    if(response_message.message== "Post added sucessfully.")
                    {
                        console.log("message received successfully");
                        alert("New Post Successfully Added");
                        var post = document.createElement('div');
                        
                        var postdata= response_message.postdata;
                        post.id = response_message.postdata.postid;
    
                        post.innerHTML=  `
                            <h4>${postdata.postcontent}</h4>
                            Posted by <a href="/user/${postdata.username}">${postdata.username}</a> with ID ${postdata.userid} on
                            ${postdata.timestamp} , Likes: ${postdata.likes}
                            <br><br>
                        `;
                        var latestPostContainer = document.querySelector("#latest_post");
                        document.querySelector("#latest_post").insertBefore(post, latestPostContainer.firstChild); 
                        
    
                    }
                        */
                    //alert("something crazy happening");
                   
                    
                }); }
                else
                {
                    console.log("Error occured resubmit");
                }

            })
            }); 


            var removebutton = document.getElementById("following_remove");

            // Add a click event listener to the button
            removebutton.addEventListener("click", function() {
            console.log("button clicked");
            //alert("Button with id 'following_add' was clicked!");
            
            //alert(`something else weird is  happening ${username} `);


                
            fetch(`/user/${profileusername}`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "request_type": "removeFollow",
                    "followingremove": true,
                    
                }),
                credentials: 'same-origin'
                
                
            }).then(response => {
                    if(response.status==200) {
                    response.json().then(response_message =>{
                    //var followadd = document.getElementById('following_add');
                    //var followremove = document.getElementById('following_remove');
    
                    //followremove.style.display = 'block';
                    //followingadd.style.display = 'none';
                    console.log("follower removed sucessfully");
                    document.getElementById('following_remove').style.display = 'none';
                    document.getElementById('following_add').style.display = 'block';
                    
                   
                    
                }); }
                else
                {
                    console.log("Error occured resubmit");
                }

            })
            }); 




       }
       else
       {
        console.log("same person or not logged in");
       }

    
        //document.getElementById("compose-post").value="Input Textss";
    
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        
        
    
        

    var edit= document.querySelectorAll(".edit_link");
    edit.forEach(function(post){
        post.addEventListener('click',function(event) {

            event.preventDefault();
            console.log("edit link clicked");
            var post = this.getAttribute('data-post');
            var id = this.getAttribute('data-id');
            console.log('Data Info:', post);
            console.log('Data ID:', id);
            //console.log('Post ID:',this.id);
            var postelement = document.getElementById(id);
            const csrftoken = getCookie('csrftoken');
            postelement.innerHTML=`<form name="new-post-forms" id="form-${id}" method="post">
            <input type="hidden" name="csrfmiddlewaretoken" value="${csrftoken}">
            <textarea name="postinput" class="form-control" id="compose-posts-${id}" required>${post}</textarea>
            <input type="submit" value="Post" class="btn btn-primary"/>
        </form>`;
        
        var form_name= document.getElementById(`form-${id}`);
        
            form_name.addEventListener('submit', function(event) {
        //document.getElementById('new-post-forms').addEventListener('submit', function(event) {
        
            event.preventDefault();
            // Your form submission logic here
            
            

            
            

            var formId = this.id;
            
            //console.log('Form with name ' + formName + ' was submitted');
            console.log('Form id is: ' + formId );
            console.log(`Post id is: form-${id}`);
            console.log("Nah testing jimbrutta");
            
            if (formId===`form-${id}`) {
                event.preventDefault();
                let post_text = document.querySelector(`#compose-posts-${id}`).value;
    
                console.log("Post text is " + post_text);
                console.log("User is Alan. Form ID is " + formId);
                fetch('/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "request_type":"editpost",
                        post_text: post_text,
                        post_id: id,
                        
                    }),
                    credentials: 'same-origin'
                    
                    
                }).then(response => { if(response.status==200) {response.json().then(response_message =>{
                    var textarea = document.getElementById('compose-post');
                    textarea.value = ''; // Clear the value
                    console.log(response_message);
                    if(response_message.message== "Post edited sucessfully.")
                    {
                        console.log("message received successfully");
                        alert("Post Edited Successfully");

                        
                        


                        //var post = document.createElement('div');
                        
                        var postdata= response_message.postdata;
                        //post.id = response_message.postdata.postid;
    

                        postelement.innerHTML=`<h4>${postdata.postcontent}</h2>
                        Posted by <a href="/user/${postdata.username}">${postdata.username}</a> with ID ${postdata.userid} on
                        ${postdata.timestamp}  ,  Likes: ${postdata.likes} 
                        , <a href='#' data-id=${postdata.postid} data-post="${postdata.postcontent}" class="edit_link" style="display: inline-block;">Edit</a>
                            <br><br>`;
                        editlink_func();
                        
                        /*post.innerHTML=  `
                            <h4>${postdata.postcontent}</h4>
                            Posted by <a href="/user/${postdata.username}">${postdata.username}</a> with ID ${postdata.userid} on
                            ${postdata.timestamp} , Likes: ${postdata.likes}
                            <br><br>
                        `;
                        var latestPostContainer = document.querySelector("#posts");
                        document.querySelector("#posts").insertBefore(post, latestPostContainer.firstChild);
                        */

    
                    }
                    //alert("something crazy happening");
                   
                    
                }); }
            else {
                console.log("Error occured resubmit");
                console.log(`Response message is ${response.error}`);
                
            } });
    
                
            }
            
    
    
            console.log('Form submitted!');
        }); 
        });

    });

    like_post();
    unlike_post();


        
    });
    
    
    