const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "contacts.json");

async function updateContactsList(newList) {
	await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
}

const listContacts = async () => {
	const data = await fs.readFile(contactsPath, "utf-8");
	const parcedData = await JSON.parse(data);
	return parcedData;
};

const getContactById = async (contactId) => {
	const contactsList = await listContacts();
	const findContact = await contactsList.find(
		(contact) => contact.id === contactId
	);
	return findContact || null;
};

const removeContact = async (contactId) => {
	const contactsList = await listContacts();
	const idx = contactsList.findIndex((contact) => contact.id === contactId);
	if (idx === -1) {
		return null;
	}
	const [filteredContact] = contactsList.splice(idx, 1);
	await updateContactsList(contactsList);
	return filteredContact;
};

const addContact = async (name, email, phone) => {
	const contactsList = await listContacts();
	const newContact = {
		id: shortid.generate(),
		name,
		email,
		phone,
	};

	contactsList.unshift(newContact);
	await updateContactsList(contactsList);
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contactsList = await listContacts();
	const index = contactsList.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contactsList[index] = { id: contactId, ...body };
	await updateContactsList(contactsList);
	return contactsList[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
