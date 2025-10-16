import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// Get all submissions for a specific form
router.get("/:formId", async (req, res) => {
  try {
    const submissions = await Submission.find({ formId: req.params.formId }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
