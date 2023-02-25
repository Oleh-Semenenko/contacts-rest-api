const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
	const { id } = req.params;
	const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!data) {
		throw HttpError(400, "missing field favorite");
	}
	res.json(data);
};

module.exports = updateFavorite;