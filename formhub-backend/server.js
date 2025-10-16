import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import embedRoutes from "./routes/embedRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/forms", embedRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/submissions", submissionRoutes);

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
