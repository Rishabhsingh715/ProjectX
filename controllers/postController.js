const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req , res){
    console.log("The user is-",req.user._id);
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err, post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res){

    Post.findById(req.params.id, function(err ,post){

        // .id in the user automatically converts id into a String, for comparison..
       if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
       }else{
           res.redirect('back');
       }
    })
}