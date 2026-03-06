import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.post("/", notImplemented("Create booking"));
router.get("/", notImplemented("List bookings"));
router.get("/mine", notImplemented("List my bookings"));
router.get("/:id", notImplemented("Get booking by id"));
router.patch("/:id/cancel", notImplemented("Cancel booking"));
router.patch("/:id/status", notImplemented("Update booking status"));

export default router;
