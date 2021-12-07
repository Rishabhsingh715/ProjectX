{
    
// in this whole we are using ajax with jquery i.e. jquery ajax to make dynamic webpages.
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        

        newPostForm.submit(function(e){
            
            e.preventDefault();
            


            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),   //serialize means converting the code into json to be sent.
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    
                    $("#post-container").prepend(newPost); //what this line does is that it creates another post and append it to the post container like appending another item into the list, so this is the Ajax's job to append this in real time without refreshing the page and when we load the page next time it loads from the DB, but for as for now it just loads from data you passed and also stored inside the db.
                    deletePost($('.delete-post-button', newPost));

                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    let newPostDom = function(post){
        return $(`<div id="post-${post._id}">
        <h1>Post by ${ post.user.name}</h1>
        <small>Last updated at - ${ post.updatedAt.toString().substring(0,21)  } </small>
        <p>${ post.content}</p>
        
   
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete-Post</a>
        </small>

        
  
       <div class="post-comments">
         
     
          <form action="/comments/create" method="post">
              <input type="text" name="content" placeholder="Type here to add the coment" class="dodo">
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" value="Add Comment" class="dodo">
     
          </form>
     
         
          
          <h3>Comments</h3>
          <div class="post-comments-list">
     
              <ul id="post-comments-${ post._id }">
                </ul>
     
          </div>



        </div>
     </div>`)
    }

    
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                   
                     $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    let delP = function(link){
        $('.delete-post-button').click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(link).prop('href'),
                success: function(data){
                    console.log(`post-${data.data.post_id}`);
                    $(`#post-${data.data.post_id}`).remove();
                    console.log('deleted');
                }
            });
        });
    }

    createPost();
    delP('.delete-post-button');

}