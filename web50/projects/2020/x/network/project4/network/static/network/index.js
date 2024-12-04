/*let counter=1;
const quantity=10; */

function load() {

/* const start = counter;
const end = start + quantity-1;
counter = end+1;



fetch(`/posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
    })

};*/ 


//fetch(`/posts?start=${start}&end=${end}`);






// Iterate over the kws array and create HTML elements



}; 



function add_post(contents) {

    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = contents;

    // Add post to DOM
    document.querySelector('#posts').append(post);
};

document.addEventListener('DOMContentLoaded', function() {

   

    load();


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
                fetch('', {
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
    
    
    

    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var formId = this.id;
            
            console.log('Form with ID ' + formId + ' was submitted');
            console.log("Nah testing jimbrutta")
            
            if (formId === 'new-post-form') {
                event.preventDefault();
                let post_text = document.querySelector('#compose-post').value;
    
                console.log("Post text is " + post_text);
                console.log("User is Alan. Form ID is " + formId);
                fetch('', {
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
                            , <a href='#' data-id=${postdata.postid} data-post="${postdata.postcontent}" class="edit_link" style="display: inline-block;">Edit</a>
                            <br><br>
                        `;
                        var latestPostContainer = document.querySelector("#posts");
                        document.querySelector("#posts").insertBefore(post, latestPostContainer.firstChild);
                        editlink_func();

                    }
                    //alert("something crazy happening");
                   
                    
                }); 
    
                
            }
            //alert("New Post Sucefully Added");
        });
    });

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
                fetch('', {
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
            } });
    
                
            }
            
    
    
            console.log('Form submitted!');
        }); 
        });

    });
    

    



    var like= document.querySelectorAll(".like_link");
    like.forEach(function(post){
        post.addEventListener('click',function(event) {

            event.preventDefault();
            console.log("like link clicked");
            var id = this.getAttribute('data-id');
            console.log('Data ID:', id);
            //console.log('Post ID:',this.id);
            var postelement = document.getElementById(id);
            const csrftoken = getCookie('csrftoken');
            
        
        
        
           
            
            
            
            
               
                
    
                
                fetch('', {
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
                   alert("Post liked sucessfully.")
                    console.log(response_message);
                    if(response_message.message== "Post liked sucessfully")
                    {
                        console.log("message received successfully");
                        alert("Post Liked Successfully");

                        document.getElementById(`${id}-like`).style.display = 'none';
                        document.getElementById(`${id}-unlike`).style.display = 'inline-block';

    
                    }
                    //alert("something crazy happening");
                   
                    
                }); }
            else {
                console.log("Error occured resubmit");
            } });
    
                
            
    
    
         




        });

    });



    

    
    
});


