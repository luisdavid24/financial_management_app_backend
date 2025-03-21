const express = require('express');
const TimeService = require('../services/time.service.js');
const timeSchema = require('../schemas/time.schema.js');
const verifyUser = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(verifyUser);

router.get('/', async (req, res) => {
  try {
    const times = await TimeService.getAll();
    console.log(times)
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const time = await TimeService.getById(req.params.id);
    res.json(time);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { error } = timeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const time = await TimeService.create(req.body);
    res.status(201).json(time);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  /* const { error } = timeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
 */
  try {
    const time = await TimeService.update(req.params.id, req.body);
    res.json(time);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const time = await TimeService.delete(req.params.id);
    res.json(time);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
