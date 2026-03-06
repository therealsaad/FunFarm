import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.post("/image", notImplemented("Upload single image"));
router.post("/images", notImplemented("Upload multiple images"));
router.delete("/:publicId", notImplemented("Delete uploaded image"));

export default router;
