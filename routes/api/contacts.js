const express = require("express");
const {
	getAllContacts,
	getContactById,
	addContact,
	deleteContact,
	updateContactById,
	updateFavorite,
} = require("../../controllers/contacts");
const { contactValidation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", contactValidation(schemas.addSchema), addContact);

router.delete("/:id", isValidId, deleteContact);

router.put(
	"/:id",
	isValidId,
	contactValidation(schemas.addSchema),
	updateContactById
);

router.patch(
	"/:id/favorite",
	isValidId,
	contactValidation(schemas.updateFavoriteSchema),
	updateFavorite
);

module.exports = router;
