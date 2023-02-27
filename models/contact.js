const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			match: /^\(\d{3}\) \d{3}-\d{4}$/,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
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
	favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleMongooseError);

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
