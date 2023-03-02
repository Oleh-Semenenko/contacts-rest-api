const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;	

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			match: emailRegex,
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
	username: Joi.string().min(1).required(),
	email: Joi.string().pattern(emailRegex).required(),
	password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegex).required(),
	password: Joi.string().min(6).required(),
});

userSchema.post("save", handleMongooseError);

const schemas = {
	registerSchema,
	loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
