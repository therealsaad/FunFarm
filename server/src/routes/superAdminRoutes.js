import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.get("/dashboard", notImplemented("Super admin dashboard"));
router.get("/admins", notImplemented("Get admins"));
router.post("/admins", notImplemented("Create admin"));
router.patch("/admins/:id/status", notImplemented("Update admin status"));
router.get("/subscriptions", notImplemented("Get subscriptions"));
router.patch("/subscriptions/:id", notImplemented("Update subscription"));
router.get("/analytics", notImplemented("Platform analytics"));

export default router;
