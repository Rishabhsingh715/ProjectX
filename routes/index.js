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

router.get('/profile/:id', passport.checkAuthentication ,profileController.profile);

router.post('/create',createController.create);

router.get('/sign-out',createController.signout);

router.get('/backtosignup',profileController.backtosignup);

router.get('/home',profileController.home);

router.post('/update', profileController.udpate);

router.get('/showw',profileController.showw);



//use passport as a middleware to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
),createController.createSession);

router.use('/posts', require('./posts'));
router.use('/comments',require('./comments'));

module.exports = router;