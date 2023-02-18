const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
	const data = await listContacts();
	res.json(data);
};

const getOneContact = async (req, res) => {
	const id = req.params.contactId;
	const data = await getContactById(id);
	if (!data) {
		res.status(404).json({ message: "Not found" });
	}
	res.json(data);
};

const addOneContact = async (req, res) => {
	const { name, email, phone } = await req.body;
	const data = await addContact(name, email, phone);
	res.status(201).json(data);
};

const deleteContact = async (req, res) => {
	const id = req.params.contactId;
	const deletedContact = await removeContact(id);
	if (!deletedContact) {
		return res.status(404).json({ message: "Not found" });
	}
	res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
	const id = req.params.contactId;
	const data = await updateContact(id, req.body);
	if (!data) {
		return res.status(404).json({ message: "Not found" });
	}
	res.json(data);
};

module.exports = {
	getContacts,
	getOneContact,
    addOneContact,
    deleteContact,
	updateContactById,
};
