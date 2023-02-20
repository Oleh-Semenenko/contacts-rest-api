const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().alphanum().min(1).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	phone: Joi.string()
		.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
		.required(),
});

module.exports = { contactSchema };