const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req , res){
    
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'post created!!'
            });
        }
    
        return res.redirect('/sign-in');
    } catch (error) {
        console.log('Error in post controller.create', error);
        return;
    }
}

module.exports.destroy = async function(req, res){

    try {
        var post = await Post.findById(req.params.id); 

       if(post.user == req.user.id){
            post.remove();

          await Comment.deleteMany({post: req.params.id});

          return res.redirect('back');
       }else{
           res.redirect('back');
       }
    } catch (error) {
        console.log('Error in post controller.create', error);

    }
    
}