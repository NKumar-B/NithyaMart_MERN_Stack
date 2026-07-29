import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Nike Dri-FIT Legend T-Shirt',
    brand: 'Nike',
    category: 'Sports T-Shirts',
    price: 30,
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/618v4rX01TL._AC_UL480_FMwebp_QL65_.jpg',
    description: 'Lightweight moisture-wicking polyester athletic shirt designed for maximum breathable comfort during training.'
  },
  {
    id: 2,
    name: 'Adidas Own The Run Tee',
    brand: 'Adidas',
    category: 'Sports T-Shirts',
    price: 35,
    rating: 4.6,
    image: 'https://th.bing.com/th/id/OIP.7HeodpVt1r02GxJEmi59CgHaHa?w=174&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Soft running t-shirt featuring AEROREADY tech to keep you cool and dry on daily outdoor runs.'
  },
  {
    id: 3,
    name: 'Puma Velocity Training Tee',
    brand: 'Puma',
    category: 'Sports T-Shirts',
    price: 28,
    rating: 4.5,
    image: 'https://th.bing.com/th/id/OIP.cCh2pfM7WyjU0QLWUTyxdAHaHa?w=211&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Ergonomic performance tee with dryCELL fabric constructed for unrestricted mobility and speed.'
  },
  {
    id: 4,
    name: 'Under Armour Tech 2.0 Tee',
    brand: 'Under Armour',
    category: 'Sports T-Shirts',
    price: 25,
    rating: 4.8,
    image: 'data:image/webp;base64,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',
    description: 'UA Tech fabric is quick-drying, ultra-soft, and delivers a natural feel for high-intensity athletic sessions.'
  },
  {
    id: 5,
    name: 'Nike AeroSwift National Jersey',
    brand: 'Nike',
    category: 'Jerseys',
    price: 90,
    rating: 4.9,
    image: 'https://i.pinimg.com/736x/cb/83/c2/cb83c237e8efb32b8652076600cd696f.jpg',
    description: 'Match-day competition jersey engineered with open-hole mesh structure for unmatched ventilation.'
  },
  {
    id: 6,
    name: 'Adidas Condivo Match Jersey',
    brand: 'Adidas',
    category: 'Jerseys',
    price: 75,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&auto=format&fit=crop&q=80',
    description: 'Lightweight pro-level athletic jersey crafted with recycled primegreen materials for team play.'
  },
  {
    id: 7,
    name: 'Puma TeamLIGA Pro Jersey',
    brand: 'Puma',
    category: 'Jerseys',
    price: 65,
    rating: 4.6,
    image: 'https://th.bing.com/th/id/OIP.dZHF8qlV0-PHICsNMG8Q2wHaHa?w=202&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Vibrant sport jersey built with advanced moisture management for soccer and field endurance.'
  },
  {
    id: 8,
    name: 'Reebok Classic Club Jersey',
    brand: 'Reebok',
    category: 'Jerseys',
    price: 55,
    rating: 4.4,
    image: 'https://th.bing.com/th/id/OPAC.HUIi3eEqFnnoFQ474C474?w=300&h=300&o=5&dpr=1.3&pid=21.1',
    description: 'Retro heritage court jersey with breathable side inserts and comfortable relaxed cut.'
  },
  {
    id: 9,
    name: 'Nike Sportswear Club Hoodie',
    brand: 'Nike',
    category: 'Sports Hoodies',
    price: 65,
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/41R4CwfJu3L._SX385_.jpg',
    description: 'Brushed-back fleece pullover hoodie offering cozy warmth before, during, and after athletic training.'
  },
  {
    id: 10,
    name: 'Adidas Z.N.E. Athletic Hoodie',
    brand: 'Adidas',
    category: 'Sports Hoodies',
    price: 80,
    rating: 4.7,
    image: 'https://th.bing.com/th/id/OIP.4o0basnQGGtQHP_nEu8J8gHaHa?w=225&h=220&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Four-way stretch hoodie designed specifically to help athletes focus and isolate background noise.'
  },
  {
    id: 11,
    name: 'Under Armour Rival Fleece Hoodie',
    brand: 'Under Armour',
    category: 'Sports Hoodies',
    price: 55,
    rating: 4.6,
    image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/x/g/g/xl-flhs001-c-flyind-outfit-original-imahhhrrbk5bx7zk.jpeg?q=70',
    description: 'Midweight cotton-blend fleece hoodie with soft brushed interior and adjustable hood styling.'
  },
  {
    id: 12,
    name: 'ASICS Gel-Warm Training Hoodie',
    brand: 'ASICS',
    category: 'Sports Hoodies',
    price: 70,
    rating: 4.5,
    image: 'https://th.bing.com/th/id/OIP.Eq9iIGeXePYot0kc1hn9SAHaHa?w=148&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Thermal insulating fleece pullover built for early morning running and outdoor warmth.'
  },
  {
    id: 13,
    name: 'Nike Windrunner Sports Jacket',
    brand: 'Nike',
    category: 'Sports Jackets',
    price: 100,
    rating: 4.9,
    image: 'https://th.bing.com/th/id/OIP.GPmYmvgzDiumLlrOMpMLJQHaHa?w=205&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Iconic chevron windbreaker jacket delivering lightweight weather protection and back vent cooling.'
  },
  {
    id: 14,
    name: 'Puma T7 Track Sports Jacket',
    brand: 'Puma',
    category: 'Sports Jackets',
    price: 85,
    rating: 4.7,
    image: 'https://th.bing.com/th/id/OIP.TKkMIh4hBAJce5N_CIUFZQHaI4?w=149&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    description: 'Classic athletic track jacket featuring contrast shoulder stripes, zip pockets, and stand-up collar.'
  }
];

const CATEGORIES = ['All', 'Sports T-Shirts', 'Jerseys', 'Sports Hoodies', 'Sports Jackets'];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleShopNow = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        body {
          background-color: #f8f9fa;
          color: #333;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Navbar */
        .navbar {
          background-color: #1e293b;
          color: #fff;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .nav-logo {
          font-size: 22px;
          font-weight: bold;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .nav-link {
          color: #cbd5e1;
          background: none;
          border: none;
          font-size: 15px;
          cursor: pointer;
          padding: 5px 10px;
        }

        .nav-link:hover {
          color: #fff;
        }

        .search-input {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          font-size: 14px;
          width: 200px;
        }

        .cart-btn {
          background-color: #2563eb;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        }

        .cart-btn:hover {
          background-color: #1d4ed8;
        }

        /* Hero Section */
        .hero {
          background-color: #0f172a;
          color: #fff;
          text-align: center;
          padding: 60px 20px;
        }

        .hero h1 {
          font-size: 36px;
          margin-bottom: 12px;
        }

        .hero p {
          font-size: 16px;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 24px auto;
        }

        .shop-now-btn {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
        }

        .shop-now-btn:hover {
          background-color: #1d4ed8;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 30px auto;
          padding: 0 20px;
          flex: 1;
          width: 100%;
        }

        /* Categories Filter */
        .categories-container {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }

        .category-btn {
          background-color: #e2e8f0;
          color: #334155;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .category-btn.active {
          background-color: #2563eb;
          color: #fff;
        }

        /* Product Grid */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .product-brand {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: bold;
        }

        .product-name {
          font-size: 16px;
          font-weight: bold;
          margin: 4px 0;
          color: #1e293b;
        }

        .product-category {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
        }

        .product-price {
          font-size: 18px;
          font-weight: bold;
          color: #0f172a;
        }

        .product-rating {
          font-size: 13px;
          color: #d97706;
          font-weight: bold;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .add-cart-btn {
          flex: 1;
          background-color: #16a34a;
          color: #fff;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          font-size: 13px;
        }

        .add-cart-btn:hover {
          background-color: #15803d;
        }

        .details-btn {
          background-color: #f1f5f9;
          color: #334155;
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
        }

        .details-btn:hover {
          background-color: #e2e8f0;
        }

        .no-products {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-size: 16px;
        }

        /* Modal Backdrop */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        /* Modal Body */
        .modal-content {
          background: #fff;
          border-radius: 6px;
          max-width: 550px;
          width: 100%;
          padding: 24px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .close-modal-btn {
          position: absolute;
          top: 12px;
          right: 16px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748b;
        }

        .modal-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .modal-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .modal-brand {
          font-size: 13px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .modal-description {
          font-size: 14px;
          color: #475569;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .modal-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        /* Shopping Cart Modal */
        .cart-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-title {
          font-size: 14px;
          font-weight: bold;
        }

        .cart-item-price {
          font-size: 13px;
          color: #64748b;
        }

        .cart-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .qty-btn {
          background: #e2e8f0;
          border: none;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .remove-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          margin-left: 8px;
        }

        .cart-summary {
          margin-top: 20px;
          border-top: 2px solid #e2e8f0;
          padding-top: 15px;
        }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .cart-footer-btns {
          display: flex;
          gap: 10px;
        }

        .clear-cart-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          flex: 1;
        }

        /* Footer */
        .footer {
          background-color: #1e293b;
          color: #94a3b8;
          text-align: center;
          padding: 20px;
          font-size: 14px;
          margin-top: auto;
        }

        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            gap: 12px;
            padding: 15px;
          }
          .search-input {
            width: 100%;
          }
          .nav-controls {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div
          className="nav-logo"
          onClick={() => {
            setSelectedCategory('All');
            setSearchTerm('');
          }}
        >
          SportGear Store
        </div>
        <div className="nav-controls">
          <button
            className="nav-link"
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
          >
            Home
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            Cart ({totalQuantity})
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Performance Sports Wear</h1>
        <p>Quality jerseys, t-shirts, hoodies, and jackets from top global sports brands.</p>
        <button className="shop-now-btn" onClick={handleShopNow}>
          Shop Now
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content" id="products-section">
        {/* Categories */}
        <div className="categories-container">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-category">{product.category}</div>
                </div>

                <div>
                  <div className="product-meta">
                    <span className="product-price">${product.price}</span>
                    <span className="product-rating">★ {product.rating}</span>
                  </div>

                  <div className="card-actions">
                    <button className="add-cart-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                    <button className="details-btn" onClick={() => setSelectedProduct(product)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">No sports wear products found matching your search.</div>
        )}
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>
              ✕
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
            <div className="modal-brand">{selectedProduct.brand}</div>
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-meta">
              <span className="product-price">${selectedProduct.price}</span>
              <span className="product-rating">★ {selectedProduct.rating}</span>
            </div>
            <button
              className="add-cart-btn"
              style={{ width: '100%', padding: '12px' }}
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsCartOpen(false)}>
              ✕
            </button>
            <h2 style={{ marginBottom: '15px' }}>Shopping Cart</h2>

            {cart.length === 0 ? (
              <p style={{ color: '#64748b', padding: '20px 0' }}>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-price">${item.price} each</div>
                    </div>
                    <div className="cart-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cart-summary">
                  <div className="cart-total-row">
                    <span>Total Quantity:</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="cart-total-row">
                    <span>Total Price:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="cart-footer-btns">
                    <button className="clear-cart-btn" onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SportGear Store. All rights reserved.</p>
      </footer>
    </div>
  );
}