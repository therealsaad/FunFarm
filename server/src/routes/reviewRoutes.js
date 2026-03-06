import express from "express";

const router = express.Router();

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    success: false,
    message: `${feature} is not implemented yet.`,
  });
};

router.get("/", notImplemented("List reviews"));
router.get("/farmhouse/:farmhouseId", notImplemented("Get farmhouse reviews"));
router.post("/", notImplemented("Create review"));
router.patch("/:id", notImplemented("Update review"));
router.delete("/:id", notImplemented("Delete review"));

export default router;
