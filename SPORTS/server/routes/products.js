import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/product.json');

const getProducts = () => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

// GET /api/products - Search & Multi-filter
router.get('/', (req, res) => {
  try {
    let products = getProducts();
    const { gender, category, brand, search, minPrice, maxPrice, sort, featured } = req.query;

    // Filter by Gender
    if (gender && gender !== 'All') {
      products = products.filter(
        (p) => p.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    // Filter by Category
    if (category && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Brand
    if (brand && brand !== 'All') {
      products = products.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Search query
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price filtering
    if (minPrice) {
      products = products.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Featured only
    if (featured === 'true') {
      products = products.filter((p) => p.isFeatured);
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          break;
      }
    }

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: err.message });
  }
});

// GET /api/products/meta/categories - Unique Metadata
router.get('/meta/categories', (req, res) => {
  try {
    const products = getProducts();
    const categories = ['All', ...new Set(products.map((p) => p.category))];
    const brands = ['All', ...new Set(products.map((p) => p.brand))];
    const genders = ['All', 'Men', 'Women', 'Unisex'];
    res.json({ success: true, categories, brands, genders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching metadata' });
  }
});

// GET /api/products/:id - Single Product
router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find((p) => p.id === parseInt(req.params.id, 10));

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const related = products
      .filter((p) => (p.category === product.category || p.gender === product.gender) && p.id !== product.id)
      .slice(0, 4);

    res.json({
      success: true,
      product,
      related,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
});

export default router;