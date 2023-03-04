const express = require("express");
const {
	getAllContacts,
	getContactById,
	addContact,
	deleteContact,
	updateContactById,
	updateFavorite,
} = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), addContact);

router.delete("/:id", authenticate, isValidId, deleteContact);

router.put(
	"/:id",
	authenticate,
	isValidId,
	validateBody(schemas.addSchema),
	updateContactById
);

router.patch(
	"/:id/favorite",
	authenticate,
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	updateFavorite
);

module.exports = router;
