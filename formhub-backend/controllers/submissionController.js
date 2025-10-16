import Submission from '../models/Submission.js';

export const createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create({
      formId: req.params.id,
      data: req.body
    });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubmissions = async (req, res) => {
  const submissions = await Submission.find({ formId: req.params.id });
  res.json(submissions);
};
