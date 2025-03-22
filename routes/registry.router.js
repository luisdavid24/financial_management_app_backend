const express = require('express');
const RegistryServices = require('../services/registry.service.js');
const registrySchema = require('../schemas/registry.schema.js');
const verifyUser = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(verifyUser);

router.get('/', async (req, res) => {
  try {
    const times = await RegistryServices.getAll();

    res.json(times);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const time = await RegistryServices.getById(req.params.id);
    res.json(time);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { error } = registrySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const time = await RegistryServices.create(req.body);
    res.status(201).json(time);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error } = registrySchema.registrySchemaPut.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const time = await RegistryServices.update(req.params.id, req.body);
    res.json(time);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const time = await RegistryServices.delete(req.params.id);
    res.json(time);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
