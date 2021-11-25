const express = require('express');

const router = express.Router();

const passport = require('passport');

const signupController = require('../controllers/home');
const signinController = require('../controllers/home');
const profileController = require('../controllers/home');
const createController = require('../controllers/home');
console.log('router loaded');


router.get('/',signupController.signup);

router.get('/sign-in',signinController.signin);

router.get('/profile', passport.checkAuthentication ,profileController.profile);

router.post('/create',createController.create);

router.get('/sign-out',createController.signout);

//use passport as a middleware to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
),createController.createSession);


module.exports = router;