import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

const { register, login } = authController;

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", notImplemented("Refresh token"));
router.post("/logout", notImplemented("Logout"));
router.post("/forgot-password", notImplemented("Forgot password"));
router.patch("/reset-password/:token", notImplemented("Reset password"));
router.get("/verify-email/:token", notImplemented("Email verification"));

export default router;FF
