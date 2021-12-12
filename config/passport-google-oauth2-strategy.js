const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: "123922143908-at337ubr4aun3cakt1ce0ailq1kgc3t4.apps.googleusercontent.com",
        clientSecret:"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" ,
        callbackURL: 'http://localhost:8000/users/auth/google/callback' ,
    
  },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){

            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err) {console.log('error in creating user google-passport-st', err); return;}

                    return done(null, user)
                });
          }
      })
  }
));

module.exports = passport;
