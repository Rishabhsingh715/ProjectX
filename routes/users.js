const express = require('express');

const router = express.Router();

const passport = require('passport');

const createController = require('../controllers/home');

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/sign-in'}),createController.createSession);

module.exports = router;

