// routes/posts.js - Routes for post operations

const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/postController');

const { protect } = require('../middleware/auth');
const { validatePost, validateComment } = require('../middleware/validation');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.post('/', protect, validatePost, createPost);
router.put('/:id', protect, validatePost, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, validateComment, addComment);

module.exports = router;
