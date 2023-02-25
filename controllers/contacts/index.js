const { ctrlWrapper } = require("../../helpers");

const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	deleteContact: ctrlWrapper(deleteContact),
	updateContactById: ctrlWrapper(updateContactById),
	updateFavorite: ctrlWrapper(updateFavorite),
};
