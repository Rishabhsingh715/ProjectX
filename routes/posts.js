const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postController');

router.post('/create', postsController.create);

module.exports = router;