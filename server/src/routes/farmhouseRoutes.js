import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.get("/", notImplemented("List farmhouses"));
router.get("/:id", notImplemented("Get farmhouse by id"));
router.post("/", notImplemented("Create farmhouse"));
router.patch("/:id", notImplemented("Update farmhouse"));
router.delete("/:id", notImplemented("Delete farmhouse"));
router.patch("/:id/status", notImplemented("Update farmhouse status"));

export default router;
