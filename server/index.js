import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env reliably from server directory or root project directory
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API Routes
app.use('/api', apiRouter);

// Root route welcome handler
app.get('/', (req, res) => {
  res.json({
    message: 'Nithya Mart MERN Stack Central Express Gateway is Live!',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      orders: '/api/orders',
      seed: 'POST /api/products/seed'
    }
  });
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found on server.` });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`   NITHYA MART CENTRAL EXPRESS SERVER RUNNING`);
  console.log(`  API Gateway: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);
});

// Serve React build
app.use(express.static(path.join(__dirname, "../dist")));

app.use((req, res) => {
  if (!req.path.startsWith("/api")) {
    return res.sendFile(path.join(__dirname, "../dist/index.html"));
  }

  res.status(404).json({ message: "API route not found" });
});