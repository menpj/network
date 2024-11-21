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
        
        
    
        document.querySelectorAll('form').forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                var formId = this.id;
                
                console.log('Form with ID ' + formId + ' was submitted');
                
                
                
            });
        });
    });
    
    
    