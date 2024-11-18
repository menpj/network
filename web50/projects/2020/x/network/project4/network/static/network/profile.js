
    
    
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
                                ${postdata.timestamp} , Likes: ${postdata.likes}
                                <br><br>
                            `;
                            var latestPostContainer = document.querySelector("#latest_post");
                            document.querySelector("#latest_post").insertBefore(post, latestPostContainer.firstChild);

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
                
                
            }).then(response => response.json()).then(response_message =>{
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
               
                
            }); 
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
        
        
    
        
        
    });
    
    
    