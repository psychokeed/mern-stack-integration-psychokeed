// routes/categories.js - Routes for category operations

const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const { protect, authorize } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validation');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), validateCategory, createCategory);
router.put('/:id', protect, authorize('admin'), validateCategory, updateCategory);
router.delete('/:id', protect, authorize('admin'), deleteCategory);

module.exports = router;
