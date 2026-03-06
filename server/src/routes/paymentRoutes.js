import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.post("/create-intent", notImplemented("Create payment intent"));
router.post("/verify", notImplemented("Verify payment"));
router.post("/webhook", notImplemented("Payment webhook"));
router.get("/:bookingId", notImplemented("Get payment by booking"));
router.post("/refund/:paymentId", notImplemented("Refund payment"));

export default router;
