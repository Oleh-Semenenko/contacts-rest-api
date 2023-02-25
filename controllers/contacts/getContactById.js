const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
	const { id } = req.params;
	const data = await Contact.findById(id);

	if (!data) {
		throw HttpError(404, "Not found");
	}
	res.json(data);
};

module.exports = getContactById;
