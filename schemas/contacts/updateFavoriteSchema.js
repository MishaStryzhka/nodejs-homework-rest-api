const Joi = require("joi");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.required()
})

module.exports = updateFavoriteSchema;