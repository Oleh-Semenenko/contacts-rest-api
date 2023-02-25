const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const { Contact } = require("../models/contact");

const getContacts = async (req, res) => {
	const data = await Contact.find({}, "-createdAt -updatedAt");
	console.log(data);
	res.json(data);
};

const getContactById = async (req, res) => {
	const { id } = req.params;
	const data = await Contact.findById(id);

	if (!data) {
		throw HttpError(404, "Not found");
	}
	res.json(data);
};

const addOneContact = async (req, res) => {
	const data = await Contact.create(req.body);
	res.status(201).json(data);
};

const deleteContact = async (req, res) => {
	const {id} = req.params;
	const deletedContact = await Contact.findByIdAndDelete(id);
	if (!deletedContact) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
	const { id } = req.params;
	const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!data) {
		throw HttpError(404, "Not found");
	}
	res.json(data);
};

const updateFavorite = async (req, res) => {
	const { id } = req.params;
	const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!data) {
		throw HttpError(400, "missing field favorite");
	}
	res.json(data);
};

module.exports = {
	getContacts: ctrlWrapper(getContacts),
	getContactById: ctrlWrapper(getContactById),
	addOneContact: ctrlWrapper(addOneContact),
	deleteContact: ctrlWrapper(deleteContact),
	updateContactById: ctrlWrapper(updateContactById),
	updateFavorite: ctrlWrapper(updateFavorite),
};
