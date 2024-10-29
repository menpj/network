let counter=1;
const quantity=20;

const page= 1;
const itemsPerPage = 10;

function load() {

const start = counter;
const end = start + quantity-1;
counter = end+1;





    fetch(`/getposts?page=${page}&per_page=${itemsPerPage}`)
    .then(response => response.json())
    .then(data => {
        // Access the meta data
        const meta = data.meta;
    
        add_post(data.data);
        add_navBar(meta);
    })
    .catch(error => console.error(error));

}; 

function add_navBar(meta) {

        console.log('Page:', meta.page);
        console.log('Items per page:', meta.per_page);
        console.log('Total pages:', meta.total_pages);
        console.log('Total items:', meta.total_items);
        const container = document.querySelector('#nav-bar');

        if(container) {
            const fragment = document.createDocumentFragment();
            if(meta.page>1)
            {
                const has_previous = document.createElement('a');
                has_previous.innerHTML= "&laquo; first    ";
                has_previous.href = 'https://www.example.com';
                has_previous.id="has-previous";
                fragment.appendChild(has_previous);

                const previous_page = document.createElement('a');
                previous_page.innerText = "   previous   ";
                previous_page.href = "https://www.example.com";
                previous_page.id = "previous-page";
                fragment.appendChild(previous_page);

            }

            const current = document.createElement('span');
            current.innerText="Page " + meta.page + " of " + meta.total_pages + '.  '; 
            current.className = "current";
            fragment.appendChild(current);

            if(meta.page<meta.total_pages)
            {
                const next_page = document.createElement('a');
                next_page.innerText = "   next   ";
                next_page.href = "https://www.example.com";
                next_page.id = "next-page";
                fragment.appendChild(next_page);
                next_page.addEventListener('click', function(event) {
                    event.preventDefault();
                    //alert("Next page clicked");
                    fetch(`/getposts?page=${page+1}&per_page=${itemsPerPage}`)
                        .then(response => response.json())
                        .then(data => {
                            // Access the meta data
                            const meta = data.meta;
                        
                            add_post(data.data);
                            add_navBar(meta);
                        })
                        .catch(error => console.error(error));
                });

                const has_next = document.createElement('a');
                has_next.innerHTML= "   last &raquo; ";
                has_next.href = 'https://www.example.com';
                has_next.id="has-next";
                fragment.appendChild(has_next);

                

            }
            container.appendChild(fragment);



        }
        else {
            console.error('Element with ID "nav-bar" not found.');
        }



};

function add_post(contents) {

    const container = document.querySelector('#dynamic-posts');
if (container) {
    const fragment = document.createDocumentFragment();
    contents.forEach(content1 => {
        const post1 = document.createElement('pre');
        post1.innerHTML = content1;
        fragment.appendChild(post1);
    });
    container.appendChild(fragment);
} else {
    console.error('Element with ID "dynamic-posts" not found.');
}

};

document.addEventListener('DOMContentLoaded', function() {

   

    load();



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


