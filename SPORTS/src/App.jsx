import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductFilter from './components/ProductFilter';
import { ProductGrid } from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderReceiptModal from './components/OrderReceiptModal';
import Toast from './components/Toast';
import { fetchProducts, fetchMetadata } from '../services/api';
import { Activity } from 'lucide-react';

export default function App() {
  // Products & Metadata State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [brands, setBrands] = useState(['All']);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedMainCategory, setSelectedMainCategory] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(120);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Cart & Wishlist Local Storage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('apex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('apex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    fetchMetadata()
      .then((data) => {
        if (data.categories) setCategories(data.categories);
        if (data.brands) setBrands(data.brands);
      })
      .catch((err) => console.error('Metadata error:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      gender: selectedGender,
      category: selectedMainCategory !== 'All' ? selectedMainCategory : selectedCategory,
      brand: selectedBrand,
      search: searchTerm,
      maxPrice,
      sort: sortBy,
    })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [selectedGender, selectedMainCategory, selectedCategory, selectedBrand, searchTerm, maxPrice, sortBy]);

  const addToCart = (product, selectedSize = 'Standard', selectedColor = 'Standard', qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { ...product, selectedSize, selectedColor, quantity: qty }];
    });

    addToast(`Added "${product.name}" to cart!`);
  };

  const updateQuantity = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to wishlist!`);
    }
  };

  const handleResetFilters = () => {
    setSelectedGender('All');
    setSelectedMainCategory('All');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearchTerm('');
    setSortBy('featured');
    setMaxPrice(120);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setIsCheckoutOpen(false);
    clearCart();
    setAppliedCoupon(null);
    setCompletedOrder(order);
    addToast('Order confirmed! Receipt generated.', 'success');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-layout">
      <Toast toasts={toasts} />

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedMainCategory={selectedMainCategory}
        setSelectedMainCategory={setSelectedMainCategory}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onResetFilters={handleResetFilters}
      />

      <HeroBanner
        onSelectGender={(g) => {
          setSelectedGender(g);
          setSelectedMainCategory('All');
          const sec = document.getElementById('products-section');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedMainCategory(cat);
          setSelectedGender('All');
          const sec = document.getElementById('products-section');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreClick={() => {
          const sec = document.getElementById('products-section');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="main-container">
        <ProductFilter
          categories={categories}
          brands={brands}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          sortBy={sortBy}
          setSortBy={setSortBy}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <ProductGrid
          products={products}
          loading={loading}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={addToCart}
          wishlistIds={wishlist.map((w) => w.id)}
          onToggleWishlist={toggleWishlist}
        />
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onProceedToCheckout={handleProceedToCheckout}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={(id) => toggleWishlist({ id })}
        onAddToCart={addToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {completedOrder && (
        <OrderReceiptModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={18} color="#f97316" /> ApexSport Flagship Store
            </h4>
            <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
              Your #1 destination for authentic Men's & Women's sports wear, resistance bands, sweatbands, gym gloves, knee supports, shuttlecocks, tennis balls, and training gear.
            </p>
          </div>

          <div className="footer-col">
            <h4>Men's & Women's Wear</h4>
            <ul>
              <li><a href="#products-section" onClick={() => { setSelectedGender('Men'); setSelectedMainCategory('Sports Wear'); }}>Men's Dri-FIT Tees & Jerseys</a></li>
              <li><a href="#products-section" onClick={() => { setSelectedGender('Women'); setSelectedMainCategory('Sports Wear'); }}>Women's Tanks & Leggings</a></li>
              <li><a href="#products-section" onClick={() => setSelectedMainCategory('Sports Wear')}>Pro Match Jerseys</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Sports Accessories</h4>
            <ul>
              <li><a href="#products-section" onClick={() => setSelectedMainCategory('Sports Accessories')}>Resistance Bands & Wraps</a></li>
              <li><a href="#products-section" onClick={() => setSelectedMainCategory('Sports Accessories')}>Sweatbands & Sports Caps</a></li>
              <li><a href="#products-section" onClick={() => setSelectedMainCategory('Sports Accessories')}>Joint Supports & Braces</a></li>
              <li><a href="#products-section" onClick={() => setSelectedMainCategory('Sports Accessories')}>Shuttlecocks, Tennis & Cricket Balls</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li>Shipping & Delivery Policy</li>
              <li>14-Day Free Returns</li>
              <li>Official Guarantee</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ApexSport Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}