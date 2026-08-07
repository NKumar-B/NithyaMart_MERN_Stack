import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SPORTS product.json data safely
let sportsProducts = [];
try {
  const sportsDataPath = path.join(__dirname, '../../SPORTS/server/data/product.json');
  if (fs.existsSync(sportsDataPath)) {
    const content = fs.readFileSync(sportsDataPath, 'utf8');
    sportsProducts = JSON.parse(content);
  }
} catch (e) {
  console.log('[API Server]: Sports products file read error:', e.message);
}

// IceCreams and other modules sample dataset
const iceCreamProducts = [
  // ICE CREAM
  { 
    id: 101,
    name: 'Belgian Dark Chocolate Scoop', 
    category: 'Ice Cream',
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 180, 
    description: 'Rich 70% Belgian dark chocolate gelato studded with dark cocoa nibs.', 
    badge: 'Bestseller', 
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80' 
  },
  { 
    id: 102,
    name: 'Alphonso Mango Gelato', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 160, 
    description: 'Fresh Ratnagiri Alphonso mango pulp churned into velvety smooth gelato.', 
    badge: 'Seasonal', 
    image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=600&q=80' 
  },
  { 
    id: 103,
    name: 'Berry Vanilla Swirl', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 150, 
    description: 'Madagascar bourbon vanilla bean ice cream swirled with wild raspberry ribbon.', 
    badge: 'Favorite', 
    image: 'https://images.unsplash.com/photo-1488900128323-21503983257e?w=600&q=80' 
  },
  { 
    id: 104,
    name: 'Pistachio Almond Crunch', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 190, 
    description: 'Sicilian roasted green pistachios blended with crunchy almond pralines.', 
    badge: 'Premium', 
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80' 
  },
  { 
    id: 105,
    name: 'Salted Caramel Crunch', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 175, 
    description: 'Creamy caramel gelato layered with sea-salted caramel drizzle and pretzel crunch.', 
    badge: 'Trending', 
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600&q=80' 
  },
  { 
    id: 106,
    name: 'Strawberry Delight Scoop', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 155, 
    description: 'Handpicked fresh hill strawberries folded into sweet cream gelato.', 
    badge: 'Classic', 
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&q=80' 
  },
  { 
    id: 107,
    name: 'Butterscotch Royale', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 165, 
    description: 'Rich brown butter ice cream filled with golden butterscotch crunch nuggets.', 
    badge: 'Popular', 
    image: 'https://images.unsplash.com/photo-1576506295286-5cda482453a2?w=600&q=80' 
  },
  { 
    id: 108,
    name: 'Cookies & Cream Overload', 
    category: 'Ice Cream', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 170, 
    description: 'Sweet cream ice cream loaded with crushed dark chocolate sandwich cookies.', 
    badge: 'Kids Choice', 
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' 
  },

  // COLD BREW
  { 
    id: 109,
    name: 'Ibaco Hazelnut Cold Brew', 
    category: 'Cold Brew', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 210, 
    description: '18-hour slow steeped Arabica coffee infused with natural toasted hazelnut syrup.', 
    badge: 'Chilled Special', 
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80' 
  },
  { 
    id: 110,
    name: 'Caramel Macchiato Cold Brew', 
    category: 'Cold Brew', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 230, 
    description: 'Cold brewed single origin coffee over ice topped with milk foam and salted caramel.', 
    badge: 'Top Rated', 
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80' 
  },
  { 
    id: 111,
    name: 'Vanilla Cream Cold Brew', 
    category: 'Cold Brew', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 220, 
    description: 'Smooth cold brew coffee topped with a thick layer of vanilla sweet cold foam.', 
    badge: 'Refreshment', 
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80' 
  },

  // CHOCOLATE
  { 
    id: 112,
    name: 'Artisanal Almond Dark Chocolate Box', 
    category: 'Chocolate', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 499, 
    description: 'Handcrafted roasted California almond pralines dipped in 72% dark chocolate.', 
    badge: 'Luxury Gift', 
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80' 
  },
  { 
    id: 113,
    name: 'Belgian Milk Chocolate Truffles (12 Pcs)', 
    category: 'Chocolate', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 650, 
    description: 'Melt-in-mouth milk chocolate truffles dusted with premium cocoa powder.', 
    badge: 'Artisanal', 
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80' 
  },
  { 
    id: 114,
    name: 'Hazelnut Praline Gift Box', 
    category: 'Chocolate', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 799, 
    description: 'Gold foiled hazelnut chocolate pralines filled with smooth hazelnut gianduja cream.', 
    badge: 'Premium Box', 
    image: 'https://images.unsplash.com/photo-1541781774459-bb29b565090c?w=600&q=80' 
  },

  // ICE CREAM CAKE
  { 
    id: 115,
    name: 'Black Forest Ice Cream Cake', 
    category: 'Ice Cream Cake', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 899, 
    description: 'Layers of Belgian dark chocolate gelato, cherry compote, and whipped vanilla cream.', 
    badge: 'Celebration', 
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80' 
  },
  { 
    id: 116,
    name: 'Red Velvet Vanilla Crunch Cake', 
    category: 'Ice Cream Cake', 
    gender: 'Unisex',
    brand: 'Ibaco',
    price: 950, 
    description: 'Moist red velvet sponge cake layered with Madagascar vanilla bean ice cream.', 
    badge: 'Party Favorite', 
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80' 
  }
];

// Combine all product items
const allSampleProducts = [...sportsProducts, ...iceCreamProducts];

// Promo Codes for SPORTS checkout
const PROMO_CODES = {
  'SPORT20': { discount: 0.20, description: '20% Off SportGear Special' },
  'FREESHIP': { discount: 0.00, freeShipping: true, description: 'Free Express Shipping' },
  'APEX10': { discount: 0.10, description: '10% Off First Purchase' },
};

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    server: 'Nithya Mart Central Express Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// GET /api/products/meta/categories - Metadata for SPORTS app (MUST BE DECLARED BEFORE /products/:category)
router.get('/products/meta/categories', (req, res) => {
  try {
    const categories = ['All', ...new Set(sportsProducts.map((p) => p.category))];
    const brands = ['All', ...new Set(sportsProducts.map((p) => p.brand))];
    const genders = ['All', 'Men', 'Women', 'Unisex'];
    res.json({ success: true, categories, brands, genders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching metadata' });
  }
});

// GET /api/products (List all or filter by query parameters)
router.get('/products', async (req, res) => {
  try {
    const { gender, category, brand, search, minPrice, maxPrice, sort, featured } = req.query;

    let items = allSampleProducts;

    // Filter by Gender
    if (gender && gender !== 'All') {
      items = items.filter((p) => p.gender && p.gender.toLowerCase() === gender.toLowerCase());
    }

    // Filter by Category
    if (category && category !== 'All') {
      const targetRaw = category.trim().toLowerCase();
      const targetNorm = targetRaw.replace(/[^a-z0-9]/g, '');
      items = items.filter((p) => {
        if (!p.category) return false;
        const catRaw = p.category.trim().toLowerCase();
        const catNorm = catRaw.replace(/[^a-z0-9]/g, '');
        return catRaw === targetRaw || catNorm === targetNorm;
      });
    }


    // Filter by Brand
    if (brand && brand !== 'All') {
      items = items.filter((p) => p.brand && p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Search query
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((p) =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Price filtering
    if (minPrice) {
      items = items.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice && parseFloat(maxPrice) > 0) {
      const maxVal = parseFloat(maxPrice);
      const filteredByPrice = items.filter((p) => p.price <= maxVal);
      if (filteredByPrice.length > 0) {
        items = filteredByPrice;
      }
    }

    // Featured only
    if (featured === 'true') {
      items = items.filter((p) => p.isFeatured || p.badge);
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          items.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          items.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          items.sort((a, b) => (b.rating || 5) - (a.rating || 5));
          break;
        case 'newest':
          items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          break;
      }
    }

    res.json({
      success: true,
      count: items.length,
      products: items,
      data: items
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id - Single Product (Declared AFTER /products/meta/categories)
router.get('/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const product = allSampleProducts.find((p) => String(p.id) === String(productId) || String(p._id) === String(productId));

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const related = allSampleProducts
      .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
      .slice(0, 4);

    res.json({
      success: true,
      product,
      data: product,
      related,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
});

// POST /api/orders/validate-coupon (SPORTS Coupon Validation)
router.post('/orders/validate-coupon', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  const promo = PROMO_CODES[code.trim().toUpperCase()];
  if (promo) {
    return res.json({
      success: true,
      code: code.toUpperCase(),
      discount: promo.discount,
      freeShipping: promo.freeShipping || false,
      description: promo.description,
    });
  } else {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code. Try "SPORT20"' });
  }
});

// POST /api/orders/checkout (SPORTS Order Checkout)
router.post('/orders/checkout', (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discountAmount = 0;
    let freeShippingApplied = false;

    if (couponCode && PROMO_CODES[couponCode.toUpperCase()]) {
      const promo = PROMO_CODES[couponCode.toUpperCase()];
      discountAmount = subtotal * (promo.discount || 0);
      if (promo.freeShipping) freeShippingApplied = true;
    }

    const shippingFee = (subtotal > 100 || freeShippingApplied) ? 0 : 7.99;
    const taxFee = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
    const totalAmount = Number((subtotal - discountAmount + shippingFee + taxFee).toFixed(2));

    const orderId = 'APEX-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'TRK-SPORTS-' + Math.floor(10000000 + Math.random() * 90000000);

    const newOrder = {
      orderId,
      trackingNumber,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Confirmed & Processing',
      items,
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'Credit Card',
      summary: {
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        shipping: shippingFee,
        tax: taxFee,
        total: totalAmount,
      },
    };

    res.status(201).json({
      success: true,
      message: 'Order processed successfully!',
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error processing order', error: err.message });
  }
});

// POST /api/products/seed (Seed initial products into MongoDB)
router.post('/products/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(allSampleProducts);
    res.status(201).json({ success: true, message: 'Database seeded successfully with all products!', count: created.length, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Automatically trigger seeding on startup if database is empty
const seedDatabaseIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count < 20) {
      await Product.deleteMany({});
      await Product.insertMany(allSampleProducts);
      console.log(`[MongoDB Seed]: Seeded ${allSampleProducts.length} product items (including SPORTS data) into MongoDB database 'mern_team_4'.`);
    } else {
      console.log(`[MongoDB Status]: Database 'mern_team_4' contains ${count} items.`);
    }
  } catch (e) {
    console.log('[MongoDB Seed Info]: Seed check completed.');
  }
};
setTimeout(seedDatabaseIfEmpty, 1500);

export default router;
