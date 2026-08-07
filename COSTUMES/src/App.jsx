import { useState, useEffect, useRef } from 'react';
import './App.css';

// ─── DATA ────────────────────────────────────────────────────────────────────

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Men's Luxury Collection",
    subtitle: "Sophisticated styles for the modern gentleman",
    bg: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    accent: "#c9a84c",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    cta: "Shop Men's",
    cat: "Men",
  },
  {
    id: 2,
    title: "Women's Haute Couture",
    subtitle: "Elegance redefined for every occasion",
    bg: "linear-gradient(135deg, #1a0533, #5b0e6b, #200122)",
    accent: "#f0a6ca",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    cta: "Shop Women's",
    cat: "Women",
  },
  {
    id: 3,
    title: "Children's Dream Wear",
    subtitle: "Playful, comfy & colourful for little stars",
    bg: "linear-gradient(135deg, #004e92, #000428, #3d0030)",
    accent: "#56cfb2",
    img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80",
    cta: "Shop Kids'",
    cat: "Children",
  },
];

const PRODUCTS = [
  // ── MEN ──────────────────────────────────────────────────────────────────
  { id: 1, name: "Royal Sherwani", brand: "Manyavar", category: "Men", type: "Ethnic", price: 8999, rating: 4.9, badge: "Bestseller", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80" },
  { id: 2, name: "Slim Fit Tuxedo", brand: "Raymond", category: "Men", type: "Formal", price: 12499, rating: 4.8, badge: "Premium", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id: 3, name: "Linen Kurta Set", brand: "FabIndia", category: "Men", type: "Casual", price: 3299, rating: 4.7, badge: null, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { id: 4, name: "Designer Jodhpuri Suit", brand: "Siyaram", category: "Men", type: "Ethnic", price: 9799, rating: 4.8, badge: "New", img: "https://images.unsplash.com/photo-1600878459138-e1123b37cb30?w=400&q=80" },
  { id: 5, name: "Classic Nehru Jacket", brand: "Wills", category: "Men", type: "Ethnic", price: 4499, rating: 4.6, badge: null, img: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&q=80" },
  { id: 6, name: "Premium Blazer Set", brand: "Van Heusen", category: "Men", type: "Formal", price: 7999, rating: 4.7, badge: "Trending", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&q=80" },

  // ── WOMEN ────────────────────────────────────────────────────────────────
  { id: 7, name: "Banarasi Silk Saree", brand: "Nalli", category: "Women", type: "Ethnic", price: 15999, rating: 5.0, badge: "Bestseller", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTnVgob5dswRO6ZjjINU9mS4E058dvsQQyWEi4lZNKQ&s=10" },
  { id: 8, name: "Embroidered Anarkali", brand: "Biba", category: "Women", type: "Ethnic", price: 5299, rating: 4.8, badge: "Premium", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80" },
  { id: 9, name: "Designer Lehenga Choli", brand: "Kalki", category: "Women", type: "Bridal", price: 24999, rating: 4.9, badge: "New", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80" },
  { id: 10, name: "Floral Midi Dress", brand: "W for Woman", category: "Women", type: "Casual", price: 2899, rating: 4.6, badge: null, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&q=80" },
  { id: 11, name: "Palazzo Kurta Set", brand: "Aurelia", category: "Women", type: "Casual", price: 3499, rating: 4.7, badge: "Trending", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS400XXNL394P4fJeJGZEBxAqCugAXpkyGfhvOsrymz4Q&s" },
  { id: 12, name: "Organza Saree", brand: "Sabyasachi", category: "Women", type: "Ethnic", price: 18999, rating: 5.0, badge: "Luxury", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },

  // ── CHILDREN ─────────────────────────────────────────────────────────────
  { id: 13, name: "Kids Ethnic Sherwani", brand: "Manyavar Kids", category: "Children", type: "Ethnic", price: 2999, rating: 4.8, badge: "Cute", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80" },
  { id: 14, name: "Girls Lehenga Dress", brand: "Biba Kids", category: "Children", type: "Ethnic", price: 1999, rating: 4.7, badge: "Popular", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80" },
  { id: 15, name: "Boys Casual Combo", brand: "United Colors", category: "Children", type: "Casual", price: 1299, rating: 4.6, badge: null, img: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=80" },
  { id: 16, name: "Girls Frock Party Wear", brand: "Hopscotch", category: "Children", type: "Party", price: 1799, rating: 4.8, badge: "New", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80" },
  { id: 17, name: "Boys Festive Kurta", brand: "Khaadi Kids", category: "Children", type: "Ethnic", price: 1499, rating: 4.7, badge: null, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoOB8J_z3_0p0HCfE-pv1UN1zIfyHktPqwXRbJyPAk5w&s=10" },
  { id: 18, name: "Girls Printed Jumpsuit", brand: "Mothercare", category: "Children", type: "Casual", price: 1599, rating: 4.5, badge: "Trending", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80" },
];

const CATEGORIES = ["All", "Men", "Women", "Children"];
const TYPES_MAP = {
  All: ["All Types", "Ethnic", "Formal", "Casual", "Bridal", "Party", "Luxury"],
  Men: ["All Types", "Ethnic", "Formal", "Casual"],
  Women: ["All Types", "Ethnic", "Casual", "Bridal", "Luxury"],
  Children: ["All Types", "Ethnic", "Casual", "Party"],
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function App() {
  // Carousel state
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  // Filter / search
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");

  // Cart
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Carousel auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % CAROUSEL_SLIDES.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const gotoSlide = (i) => {
    clearInterval(timerRef.current);
    setSlide(i);
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % CAROUSEL_SLIDES.length);
    }, 4000);
  };

  const prevSlide = () => gotoSlide((slide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  const nextSlide = () => gotoSlide((slide + 1) % CAROUSEL_SLIDES.length);

  // Category switch resets type
  const handleCategory = (cat) => {
    setCategory(cat);
    setType("All Types");
  };

  // Filter products
  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchType = type === "All Types" || p.type === type;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  // Cart helpers
  const addToCart = (product) => {
    const exists = cart.find((c) => c.id === product.id);
    if (exists) {
      showToast(`⚠️ ${product.name} already in cart`);
    } else {
      setCart([...cart, product]);
      showToast(`✅ ${product.name} added to cart!`);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((c) => c.id !== id));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const total = cart.reduce((s, c) => s + c.price, 0);
  const cur = CAROUSEL_SLIDES[slide];

  return (
    <div className="costumes-app">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-icon">👗</span>
          <span>COSTUMES</span>
        </div>
        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search brand or outfit…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="nav-links">
          {CATEGORIES.filter(c => c !== "All").map((c) => (
            <button key={c} className={`nav-link ${category === c ? "active" : ""}`}
              onClick={() => handleCategory(c)}>{c}</button>
          ))}
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛍️ Bag
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </nav>

      {/* ── HERO CAROUSEL ── */}
      <div className="carousel" style={{ background: cur.bg }}>
        <button className="carousel-arrow left" onClick={prevSlide}>‹</button>

        <div className="carousel-content">
          <div className="carousel-text">
            <span className="carousel-tag" style={{ color: cur.accent, borderColor: cur.accent }}>
              ✦ Exclusive Collection
            </span>
            <h1 className="carousel-title">{cur.title}</h1>
            <p className="carousel-subtitle">{cur.subtitle}</p>
            <button
              className="carousel-cta"
              style={{ background: cur.accent, color: "#0a0a0a" }}
              onClick={() => handleCategory(cur.cat)}
            >
              {cur.cta} →
            </button>
          </div>
          <div className="carousel-img-wrap">
            <img src={cur.img} alt={cur.title} className="carousel-img" />
          </div>
        </div>

        <button className="carousel-arrow right" onClick={nextSlide}>›</button>

        {/* Dots */}
        <div className="carousel-dots">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === slide ? "active" : ""}`}
              style={i === slide ? { background: cur.accent } : {}}
              onClick={() => gotoSlide(i)}
            />
          ))}
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <section className="category-section">
        <div className="category-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`cat-pill ${category === c ? "cat-active" : ""}`}
              onClick={() => handleCategory(c)}
            >
              {c === "Men" && "👔 "}
              {c === "Women" && "👘 "}
              {c === "Children" && "🧒 "}
              {c === "All" && "🛍️ "}
              {c}
            </button>
          ))}
        </div>

        {/* Sub-type filter */}
        <div className="type-tabs">
          {(TYPES_MAP[category] || TYPES_MAP.All).map((t) => (
            <button
              key={t}
              className={`type-pill ${type === t ? "type-active" : ""}`}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="product-section">
        <div className="section-header">
          <h2 className="section-title">
            {category === "All" ? "All Collections" : `${category}'s Collection`}
          </h2>
          <span className="result-count">{filtered.length} items found</span>
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            <p>No outfits found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <div className="product-card" key={p.id}>
                {p.badge && <span className="badge">{p.badge}</span>}
                <div className="card-img-wrap">
                  <img src={p.img} alt={p.name} className="card-img" />
                  <div className="card-overlay">
                    <button className="quick-add" onClick={() => addToCart(p)}>
                      + Add to Bag
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <span className="card-brand">{p.brand}</span>
                  <h3 className="card-name">{p.name}</h3>
                  <div className="card-meta">
                    <span className="card-type">{p.type}</span>
                    <span className="card-rating">⭐ {p.rating}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-price">₹{p.price.toLocaleString()}</span>
                    <button
                      className={`add-btn ${cart.find(c => c.id === p.id) ? "added" : ""}`}
                      onClick={() => addToCart(p)}
                    >
                      {cart.find(c => c.id === p.id) ? "✓ Added" : "Add to Bag"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── TOAST ── */}
      {toast && <div className="toast">{toast}</div>}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>🛍️ Your Bag</h2>
              <button className="close-drawer" onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Your bag is empty.</p>
                <button className="continue-btn" onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.img} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-brand">{item.brand}</p>
                        <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total ({cart.length} items)</span>
                    <span className="total-price">₹{total.toLocaleString()}</span>
                  </div>
                  <button className="checkout-btn" onClick={() => { showToast("🎉 Order Placed Successfully!"); setCart([]); setCartOpen(false); }}>
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-icon">👗</span>
            <h3>COSTUMES</h3>
            <p>Premium fashion for every occasion</p>
          </div>
          <div className="footer-links">
            <h4>Collections</h4>
            <a onClick={() => handleCategory("Men")}>Men's Wear</a>
            <a onClick={() => handleCategory("Women")}>Women's Wear</a>
            <a onClick={() => handleCategory("Children")}>Children's Wear</a>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <a href="#">Size Guide</a>
            <a href="#">Returns & Exchange</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Nithya Mart COSTUMES | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
