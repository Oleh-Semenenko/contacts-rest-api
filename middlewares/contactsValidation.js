const Joi = require("joi");

const contactValidation = (req, res, next) => {
	const schema = Joi.object({
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
	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		return res.status(400).json({
			message: "missing required name field",
			error: validationResult.error.details[0].message,
		});
	}
	next();
};

module.exports = {
	contactValidation,
};
