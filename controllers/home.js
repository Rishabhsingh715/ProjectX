const User = require('../models/user');
const Post= require('../models/post');


module.exports.signup = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/sign-in');
    }

    return res.render('sign_up');
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email} , function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                
                return res.redirect('/sign-in');
            })
        }else{
            
            return res.redirect('/sign-in');

        }

    });
}

//sign in and create a session for the user.
module.exports.createSession = function(req,res){

    return res.redirect('/sign-in');
}

module.exports.destroySession = function(req, res){
    
    req.logout();
    return res.redirect('/sign-in');
}


module.exports.signin = function(req,res){

    if(req.isAuthenticated()){
        return res.render('profile',{
            title: 'User-profile',
            profile_user: req.user

        });
    }

    return res.render('sign-in');
}


module.exports.profile = function(req, res){
    
    User.findById(req.params.id, function(err, user){
        return res.render('profile',{
        title: 'User-profile',
        profile_user: user});
    });
    
}

module.exports.showw = function(req , res){
    
    res.redirect('/sign-in');
}

module.exports.udpate = function(req, res){
    User.findByIdAndUpdate(req.user, req.body, function(err,user){
        return res.redirect('back');
    });
}

module.exports.signout = function(req, res){
    
    req.logout();

    return res.redirect('/sign-in');
}

module.exports.backtosignup = function(req, res){
    req.logout();

    return res.redirect('/');
}

module.exports.home = function(req,res){
    
    Post.find({})
    .populate('user')         //Whenever in the schema of one collection we provide a reference  (in any field) to a document from any other collection, we need a populate() method to fill the field with that document.
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
     .exec(function(err,posts){           //if we don't specify the callback function at the time of query,then we use exec function to execute the result later.
                  
            User.find({}, function(err, users){

                return res.render('home',{
                    title: "Sociolo",
                    posts: posts,
                    all_users: users
            })
            
            
        });
    });
}