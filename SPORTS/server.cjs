const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

// Serve static assets (HTML, CSS, JS) directly from the project directory
app.use(express.static(path.join(__dirname)));

// Route handler for homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`✨ Elysian Luxe Boutique is Running!`);
  console.log(`🚀 Live URL: http://localhost:${PORT}`);
  console.log(`📍 Mall Location: Level 2, Grand Luxury Galleria`);
  console.log(`==================================================`);
});
