const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;

	await User.findByIdAndUpdate(_id, { subscription });

	res.json({ message: "The subscription was updated successfully" });
};

module.exports = updateSubscription;
