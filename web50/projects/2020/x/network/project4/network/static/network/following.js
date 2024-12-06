
   
    
    document.addEventListener('DOMContentLoaded', function() {
    
       
    
        
    
    
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
    
        
    
        document.querySelectorAll('form').forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                var formId = this.id;
                
                console.log('Form with ID ' + formId + ' was submitted');
                
                
                
            });
        });

        like_post();
        unlike_post();
    });
    
    
    