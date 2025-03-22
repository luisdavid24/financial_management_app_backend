const express = require('express');
const usersRouter = require('./users.router');
const budgetRouter = require('./budget.router');
const timeRouter = require('./time.router');
const categoryRouter= require('./category.router')
const registryRouter= require('./registry.router')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/budgets', budgetRouter);
  router.use('/times', timeRouter);
  router.use('/category', categoryRouter);
  router.use('/registry', registryRouter);
}

module.exports = routerApi;
