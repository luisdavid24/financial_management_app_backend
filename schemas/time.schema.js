const Joi = require('joi');

const timeSchema = Joi.object({
  year: Joi.number().integer().required(),
  month: Joi.number().integer().min(1).max(12).required(),
  id_user: Joi.string().uuid().required()
});


module.exports = timeSchema;
