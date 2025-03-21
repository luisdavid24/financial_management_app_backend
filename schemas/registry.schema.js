const Joi = require('joi');

const registrySchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  category_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().min(5).max(255).required(),
  date: Joi.date().iso().required(),
});

module.exports = registrySchema;
