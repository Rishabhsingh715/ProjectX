const express = require('express');

const router = express.Router();

const signupController = require('../controllers/home');
const signinController = require('../controllers/home');
const profileController = require('../controllers/home');

console.log('router loaded');


router.get('/sign-up',signupController.signup);
router.get('/sign-in',signinController.signin);
router.get('/profile',profileController.profile);


module.exports = router;