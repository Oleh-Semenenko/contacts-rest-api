const express = require("express");
const {
	getContacts,
	getContactById,
	addOneContact,
	deleteContact,
	updateContactById,
	updateFavorite,
} = require("../../controllers/contactsControllers");
const { contactValidation } = require("../../middlewares/contactValidation");
const isValidId = require("../../middlewares/isValidId");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", contactValidation(schemas.addSchema), addOneContact);

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
