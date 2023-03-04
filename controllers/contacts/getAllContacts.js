const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite } = req.query;
	const skip = (page - 1) * limit;

	const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
		skip,
		limit,
	}).populate("owner", "email subscription");

	if (favorite) {
		const filteredContacts = data.filter(
			(contact) => contact.favorite === true
		);

		return res.json(filteredContacts);
	}

	res.json(data);
};

module.exports = getAllContacts;
