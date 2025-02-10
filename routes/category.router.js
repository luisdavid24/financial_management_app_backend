const express = require('express');
const CategoryService = require('../services/category.service');
const router = express.Router();

const categoryService = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await categoryService.getAll();
  res.json(categories);
});

router.post('/', async (req, res) => {
  const category = await categoryService.create(req.body);
  res.json(category);
});

module.exports = router;
