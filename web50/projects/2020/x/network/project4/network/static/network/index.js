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
    
    

    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var formId = this.id;
            
            console.log('Form with ID ' + formId + ' was submitted');
            console.log("Nah testing jimbrutta")
            if(formId==='new-post-form')
            {   
                
               
                let post_text = document.querySelector('#compose-post').value;

                console.log("Post text is" + post_text)
                console.log("Formid is " + formId)

                
                fetch('', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_text: post_text,
                        form_id: formId,
                        
                    }),
                    credentials: 'same-origin'
                    
                    
                }).then(location.reload());
                
              
                
                
            }
            
        });
    });
});


