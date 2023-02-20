const express = require("express");
const {
	getContacts,
	getOneContact,
	addOneContact,
	deleteContact,
	updateContactById,
} = require("../../controllers/contactsControllers");
const { contactValidation } = require("../../middlewares/contactValidation");
const { contactSchema } = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getOneContact);

router.post("/", contactValidation(contactSchema), addOneContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation(contactSchema), updateContactById);

module.exports = router;
