const express = require("express");
const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
	updateAvatar,
	verifyEmail,
	resendVerifyEmail,
} = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
	"/",
	authenticate,
	validateBody(schemas.updateSubscriptionSchema),
	updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
