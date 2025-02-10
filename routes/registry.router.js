const express = require('express');
const RegistryService = require('../services/registry.service');
const router = express.Router();

const registryService = new RegistryService();

router.get('/', async (req, res) => {
  const registries = await registryService.getAll();
  res.json(registries);
});

router.post('/', async (req, res) => {
  const registry = await registryService.create(req.body);
  res.json(registry);
});

module.exports = router;
