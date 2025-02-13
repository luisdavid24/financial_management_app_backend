const express = require('express');
const usersRouter = require('./users.router');
const budgetRouter = require('./budgets.router');
const categoryRouter = require('./category.router');
const registryRouter = require('./registry.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/budgetRouter', budgetRouter);
  router.use('/registryRouter', registryRouter);
  router.use('/categoryRouter', categoryRouter);
}

module.exports = routerApi;
