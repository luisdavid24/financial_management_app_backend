const Joi = require('joi');

const budgetSchema = {
  budget:Joi.object({
    id_time: Joi.string().min(10).max(100).required(),
    name: Joi.string().min(5).max(100).required()
  }),

  budgetPut:Joi.object({
    name: Joi.string().min(5).max(100).required()
  })
}




module.exports = budgetSchema;
