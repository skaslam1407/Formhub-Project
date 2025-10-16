import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  key: String,
  label: String,
  type: String
});

const formSchema = new mongoose.Schema({
  title: String,
  fields: [fieldSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Form", formSchema);
