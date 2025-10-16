import express from "express";
import Form from "../models/Form.js";
import Submission from "../models/Submission.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// CRUD
router.get("/", auth, async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

router.get("/:id", auth, async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

router.post("/", auth, async (req, res) => {
  const form = new Form(req.body);
  await form.save();
  res.json(form);
});

router.post("/:id/submit", async (req, res) => {
  const submission = new Submission({
    formId: req.params.id,
    data: req.body
  });
  await submission.save();
  res.json({ message: "Submitted successfully" });
});

router.get("/:id/submissions", auth, async (req, res) => {
  const submissions = await Submission.find({ formId: req.params.id });
  res.json(submissions);
});

// ============================
// Embed Form Route
// ============================
router.get("/embed/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).send("Form not found");

    // Build simple form HTML dynamically
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; padding: 10px; }
            label { display: block; margin: 10px 0 5px; }
            input, textarea, select { width: 100%; padding: 8px; margin-bottom: 10px; }
            button { padding: 10px 20px; background: #007bff; color: #fff; border: none; cursor: pointer; }
          </style>
        </head>
        <body>
          <form id="formhub-form">
    `;

    form.fields.forEach(field => {
      html += `<label>${field.label}</label>`;
      if (field.type === "textarea") {
        html += `<textarea name="${field.name}" required></textarea>`;
      } else if (field.type === "select" && field.options) {
        html += `<select name="${field.name}">${field.options
          .map(o => `<option value="${o}">${o}</option>`)
          .join("")}</select>`;
      } else {
        html += `<input type="${field.type}" name="${field.name}" required />`;
      }
    });

    html += `
            <button type="submit">Submit</button>
          </form>
          <script>
            const form = document.getElementById('formhub-form');
            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(form).entries());
              const res = await fetch('http://localhost:4000/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formId: '${form._id}', data })
              });
              if (res.ok) {
                parent.postMessage({ type: 'formhub-submitted', success: true }, '*');
                alert('Form submitted successfully!');
              }
            });
          </script>
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error("Embed form error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
