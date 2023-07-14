const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { registerSchema, loginSchema, subscriptionSchema, emailSchema } = require("../../schemas/users");

const router = express.Router();

const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verification);
router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.patch("/", authenticate, validateBody(subscriptionSchema), ctrl.updateSubscription);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatars);

module.exports = router;
