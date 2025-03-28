const express = require('express');
const CategoryService = require('../services/category.service.js');
const categorySchema = require('../schemas/category.schema.js');
const verifyUser = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(verifyUser);

router.get('/', async (req, res) => {
  try {
    const budgets = await CategoryService.getAll();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const budget = await CategoryService.getById(req.params.id);
    res.json(budget);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { error }= categorySchema.category.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const budget = await CategoryService.create(req.body);
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error }= categorySchema.categoryPut.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const budget = await CategoryService.update(req.params.id, req.body);
    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const budget = await CategoryService.delete(req.params.id);
    res.json(budget);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
