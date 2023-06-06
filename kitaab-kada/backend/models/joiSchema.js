const Joi = require("joi");
const { number } = require("joi");

module.exports.bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  stock: Joi.number().required(),
});
