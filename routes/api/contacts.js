const express = require("express");
const Joi = require("joi");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
	const data = await listContacts();
	res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
	const id = req.params.contactId;
	const data = await getContactById(id);
	if (!data) {
		res.status(404).json({ message: "Not found" });
	}
	res.json(data);
});

router.post("/", async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().alphanum().min(1).max(30).required(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			})
			.required(),
		phone: Joi.string().min(7).max(15).required(),
	});
	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		return res.status(400).json({ message: "missing required name field" });
	}
	const { name, email, phone } = await req.body;
	const data = await addContact(name, email, phone);
	res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
	const id = req.params.contactId;
	const deletedContact = await removeContact(id);
	if (!deletedContact) {
		return res.status(404).json({ message: "Not found" });
	}
	res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().alphanum().min(1).max(30).required(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			})
			.required(),
		phone: Joi.string().min(7).max(15).required(),
	});
	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		return res
			.status(400)
			.json({
				message: "missing fields",
				error: validationResult.error.details,
			});
	}
	const id = req.params.contactId;
	const data = await updateContact(id, req.body);
	if (!data) {
		return res.status(404).json({ message: "Not found" });
	}
	res.json(data);
});

module.exports = router;
