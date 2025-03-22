const Joi = require('joi');

const registrySchema ={
  registrySchema : Joi.object({
    name: Joi.string().max(100).required(),
    Description: Joi.string().max(200).allow(null, ""),
    Amount: Joi.number().precision(2) .required(),
    id_Category: Joi.string().guid({ version: ["uuidv4"] }).required()
  }),
  registrySchemaPut :Joi.object({
  name: Joi.string().max(100).required(),
  Description: Joi.string().max(200).allow(null, ""),
  Amount: Joi.number().precision(2) .required()
  })
}

module.exports = registrySchema;
