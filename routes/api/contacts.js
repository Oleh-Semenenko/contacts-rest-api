const express = require("express");
const {
	getContacts,
	getOneContact,
	addOneContact,
	deleteContact,
	updateContactById,
} = require("../../controllers/contactsControllers");
const {contactValidation} = require("../../middlewares/contactsValidation")


const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getOneContact);

router.post("/", contactValidation, addOneContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation, updateContactById);

module.exports = router;
