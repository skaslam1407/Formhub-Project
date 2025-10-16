# FormHub Project

FormHub is a web-based platform for creating, managing, and embedding dynamic forms on any website. It provides a **drag-and-drop form builder**, real-time form submissions, and an **admin dashboard** to view and manage collected data. FormHub is designed to be flexible, scalable, and easy to integrate via API or embed scripts.

## Features

- Drag-and-drop form creation
- Customizable form fields: text, textarea, select, checkbox, radio, file upload
- Embed forms on external websites via JavaScript or iframe
- View and manage submissions in a table view
- JWT-based admin authentication
- REST API backend for form and submission management
- File upload support (local storage, future S3 integration)

## Tech Stack

- **Frontend:** React (Vite)  
- **Backend:** Node.js + Express + MongoDB  
- **Database:** MongoDB Atlas  
- **Auth:** JWT (JSON Web Token)  
- **Embed:** JavaScript SDK / iframe loader

## Project Structure
formhub-project/
├─ backend/
│ ├─ config/db.js
│ ├─ models/
│ ├─ routes/
│ ├─ .env
│ └─ server.js
├─ frontend/
│ ├─ public/
│ │ └─ embed.js
│ ├─ src/
│ │ ├─ pages/
│ │ ├─ api/api.js
│ │ └─ App.jsx
│ └─ vite.config.js
└─ example.html


## Installation & Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI and JWT_SECRET in .env
npm run dev

###Frontend
cd frontend
npm install
npm run dev

Example Embed
<script src="/embed.js" data-form-id="YOUR_FORM_ID"></script>
Replace YOUR_FORM_ID with the form ID from your backend.
Make sure backend is running (http://localhost:4000 by default).

#API Endpoints
POST /api/auth/login – Admin login
GET /api/forms – Get all forms
POST /api/forms – Create a new form
GET /api/forms/:id – Get a single form
GET /api/forms/embed/:id – Get embeddable form HTML
POST /api/submissions – Submit form data
GET /api/submissions/:formId – Get submissions for a form

