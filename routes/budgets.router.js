const express = require('express');
const BudgetService = require('../services/budgets.service');
const router = express.Router();

const budgetService = new BudgetService();

router.get('/', async (req, res) => {
  const budgets = await budgetService.getAll();
  res.json(budgets);
});

router.post('/', async (req, res) => {
  const budget = await budgetService.create(req.body);
  res.json(budget);
});

module.exports = router;
