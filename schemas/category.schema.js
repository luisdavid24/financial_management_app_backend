const Joi = require('joi');

const categorySchema = {
  category:Joi.object({
    id_Budget: Joi.string().min(10).max(100).required(),
    name: Joi.string().min(5).max(100).required(),
    Assets:Joi.boolean().required(),
    Liabilities:Joi.boolean().required(),
    Equity:Joi.boolean().required()
  }),


  categoryPut:Joi.object({
    name: Joi.string().min(5).max(100).required(),
    Assets:Joi.boolean().required(),
    Liabilities:Joi.boolean().required(),
    Equity:Joi.boolean().required()
  })
}




module.exports = categorySchema;
