// routes/auth.js - Routes for authentication operations

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const {
  validateUser,
  validateLogin,
} = require('../middleware/validation');

// Public routes
router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
