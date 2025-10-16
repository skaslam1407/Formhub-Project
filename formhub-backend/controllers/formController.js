import Form from '../models/Form.js';

export const createForm = async (req, res) => {
  try {
    const form = await Form.create({ ...req.body, createdBy: req.user._id });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getForms = async (req, res) => {
  const forms = await Form.find({ createdBy: req.user._id });
  res.json(forms);
};

export const getFormById = async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
};
