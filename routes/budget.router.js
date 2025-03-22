const express = require('express');
const BudgetService = require('../services/budget.service.js');
const budgetSchema = require('../schemas/budget.schema.js');
const verifyUser = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(verifyUser);

router.get('/', async (req, res) => {
  try {
    const budgets = await BudgetService.getAll();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const budget = await BudgetService.getById(req.params.id);
    res.json(budget);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { error }= budgetSchema.budget.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const budget = await BudgetService.create(req.body);
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error }= budgetSchema.budgetPut.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const budget = await BudgetService.update(req.params.id, req.body);
    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const budget = await BudgetService.delete(req.params.id);
    res.json(budget);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
