const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../worker/comment_email_worker');
const queue = require('../config/kue');

// module.exports.create = function(req, res){

//     Post.findById(req.body.post, function(err,post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err,comment){
                
//                 post.comments.push(comment).populate({
//                     email: comment.user.email
//                 })
//                 post.save();
//                 // comment = comment.populate('user','name email').execPopulate();
//                 commentsMailer.newComment(comment);

//                 // $('#post._id').append('<li><a href="#">New list item</a></li>');
                
//             });
//         }
//         else{
//             res.redirect('/home');
//         }
//     }
// );
// }

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        
        if(post){
            console.log('creating the comment');
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            console.log('i am trying to run1');

            post.comments.push(comment);
            post.save();
            console.log('i am trying to run2');


            comment = await comment.populate('user','name email');
            console.log('i am trying to run3');

            // commentsMailer.newComment(comment);

            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in creating the queue');
                    return;
                }
                console.log('Job enqueued ',job.id);
            });

           console.log('i am trying to run4');
            return res.redirect('/home');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = function(req, res){

    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postid = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postid, {$pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}