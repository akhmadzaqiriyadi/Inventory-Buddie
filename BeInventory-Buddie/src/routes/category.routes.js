const express = require('express');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const router = express.Router();

// Routes untuk category
router.get('/', getAllCategories);         // Get all categories
router.post('/', createCategory);          // Create new category
router.put('/:id', updateCategory);        // Update category
router.delete('/:id', deleteCategory);     // Delete category

module.exports = router;
