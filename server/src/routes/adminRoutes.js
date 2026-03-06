import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.get("/dashboard", notImplemented("Admin dashboard"));
router.get("/users", notImplemented("Admin users list"));
router.patch("/users/:id/status", notImplemented("Update user status"));
router.get("/bookings", notImplemented("Admin bookings list"));
router.get("/farmhouses/pending", notImplemented("Pending farmhouses"));
router.patch("/farmhouses/:id/approval", notImplemented("Farmhouse approval"));

export default router;
