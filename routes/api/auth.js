const express = require("express");
const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
} = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
	"/",
	authenticate,
	validateBody(schemas.updateSubscriptionSchema),
	updateSubscription
);

module.exports = router;
