const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "contacts.json");

async function updateContactsList(newList) {
	await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
}

const listContacts = async () => {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");
		const parcedData = await JSON.parse(data);
		return parcedData;
	} catch (error) {
		console.log(error);
	}
};

const getContactById = async (contactId) => {
	try {
		const contactsList = await listContacts();
		const findContact = await contactsList.find(
			(contact) => contact.id === contactId
		);
		return findContact || null;
	} catch (error) {
		console.log(error);
	}
};

const removeContact = async (contactId) => {
	try {
		const contactsList = await listContacts();
		const idx = contactsList.findIndex((contact) => contact.id === contactId);
		if (idx === -1) {
			return null;
		}
		const [filteredContact] = contactsList.splice(idx, 1);
		await updateContactsList(contactsList);
		return filteredContact;
	} catch (error) {
		console.log(error);
	}
};

const addContact = async (name, email, phone) => {
	try {
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
	} catch (error) {
		console.log(error);
	}
};

const updateContact = async (contactId, body) => {
	try {
		const contactsList = await listContacts();
		const index = contactsList.findIndex(item => item.id === contactId);
		if (index === -1) {
			return null;
		}
		contactsList[index] = { id: contactId, ...body };
		await updateContactsList(contactsList);
		return contactsList[index];
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
