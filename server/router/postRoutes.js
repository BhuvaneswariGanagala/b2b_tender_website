

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const protect = require('../mildlewares/authMiddleware');

router.post('/create', protect, postController.createPost);    // create post only if logged in
router.get('/all', postController.getPosts);                   // get all posts (public)
router.post('/:id/reply', protect, postController.addReply);   // reply to post (only logged in)
router.delete('/:id', protect, postController.deletePost);
module.exports = router;
