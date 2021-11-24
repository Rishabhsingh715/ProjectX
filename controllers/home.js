const User = require('../models/user')


module.exports.signup = function(req, res){

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
                console.log('i ran user created');
                return res.redirect('/sign-in');
            })
        }else{
            console.log('user created bro!!')
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
        return res.redirect('/profile');
    }

    return res.render('sign-in');
}


module.exports.profile = function(req, res){

    return res.render('profile');
}