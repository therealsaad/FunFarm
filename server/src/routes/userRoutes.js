import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.get("/profile", notImplemented("Get user profile"));
router.patch("/profile", notImplemented("Update user profile"));
router.patch("/password", notImplemented("Change password"));
router.get("/bookings", notImplemented("Get user bookings"));
router.delete("/account", notImplemented("Delete user account"));

export default router;
