const express = require("express");
const { register, login } = require("../../controllers/users");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
