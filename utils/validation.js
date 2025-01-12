const Joi = require("joi");

const schema = Joi.object({
    username: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
});

module.exports = schema;
