import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`⚡ ApexSport Express REST API Server running on port ${PORT}`);
});