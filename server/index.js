import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import apiRouter from "./routes/api.js";

// Path Configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Environment Variables

dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

// Initialize Express

const app = express();
const PORT = process.env.PORT || 5000;


// Connect Database

connectDB();


// Middleware

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes

app.use("/api", apiRouter);

// Serve React Production Build & Submodule Static Assets

const distPath = path.join(__dirname, "../dist");
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));
app.use(express.static(distPath));

// Catch-all SPA fallback middleware for React routing
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"));
});


// API 404 Handler

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.originalUrl}' not found.`,
  });
});


// Start Server

app.listen(PORT, () => {
  console.log("\n==================================================");
  console.log("   NITHYA MART CENTRAL EXPRESS SERVER RUNNING");
  console.log(`   API Gateway : http://localhost:${PORT}/api`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log("==================================================\n");
});