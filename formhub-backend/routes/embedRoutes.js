import express from "express";
import Form from "../models/Form.js";

const router = express.Router();

router.get("/embed/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) return res.status(404).send("Form not found");

  const fieldsHTML = form.fields.map(f => `
    <label>${f.label}</label>
    <input name="${f.key}" type="${f.type}" required />
  `).join("<br>");

  res.send(`
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 1rem; background: #f9f9f9; }
          form { background: #fff; padding: 1rem; border-radius: 8px; }
          button { margin-top: 1rem; padding: 8px 16px; background: #007bff; color: white; border: none; }
        </style>
      </head>
      <body>
        <form id="formhub-embed">
          <h2>${form.title}</h2>
          ${fieldsHTML}
          <button type="submit">Submit</button>
        </form>
        <script>
          const form = document.getElementById("formhub-embed");
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            await fetch("/api/forms/${form._id}/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            form.innerHTML = "<p>Thank you!</p>";
          });
        </script>
      </body>
    </html>
  `);
});

export default router;
