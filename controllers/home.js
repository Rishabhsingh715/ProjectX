const User = require('../models/user');
const Post= require('../models/post');
const fs = require('fs');
const path = require('path');

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

    req.flash('success', 'logged in successfully');
    return res.redirect('/sign-in');
}

module.exports.destroySession = function(req, res){
    
    req.logout();
    req.flash('success', 'logged out successfully');

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

module.exports.udpate = async function(req, res){
   if(req.user.id = req.params.id){

    try{
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){     //passing the request object to multer, it would handle other things. File and creation and all.
            if(err) {console.log('**multer error',err)}

            user.name = req.body.name;
            user.email = req.body.email;

            //will do it later....
            // if(user.avatar){
            //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
            // }

            if(req.file){
                // saving the string path into the DB;
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');

        }); 
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }   
   }
}

module.exports.signout = function(req, res){
    
    req.logout();

    return res.redirect('/sign-in');
}

module.exports.backtosignup = function(req, res){
    req.logout();

    return res.redirect('/');
}

module.exports.home = async function(req,res){
    
  try {
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')         
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    let users = await User.find({});

     return res.render('home',{
            title: "Sociolo",
            posts: posts,
            all_users: users });

  } catch (error) {
      console.log("Error in home controller: ",error);
      return;
  }
}