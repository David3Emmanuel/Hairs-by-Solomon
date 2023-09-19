const express = require('express');
const HttpError = require('../models/http-error');
const { getAllPosts, getPostById, getPostsByUser, createPost } = require('../controllers/post-controllers');

const router = express.Router();

router.get('/', getAllPosts)
router.get('/:postId', getPostById)
router.get('/user/:userId', getPostsByUser)

router.post('/', createPost)

module.exports = router;