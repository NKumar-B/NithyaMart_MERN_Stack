import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import "./App.css";

function resolveImagePath(path) {
  if (!path) return "";
  if (window.location.pathname.includes("/FRAGRANCE/")) {
    return `/FRAGRANCE/public${path}`;
  }
  return path;
}

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const perfumes = [
    {
      name: "Coco Mademoiselle",
      brand: "Brand: Chanel",
      price: "₹16,500",
      image: "/images/channel.avif"
    },
    {
      name: "Sauvage",
      brand: "Brand: Dior",
      price: "₹12,900",
      image: "/images/savuge.jpg"
    },
    {
      name: "Bloom",
      brand: "Brand: Gucci",
      price: "₹11,800",
      image: "/images/gucci.jpg"
    },
    {
      name: "Eros",
      brand: "Brand: Versace",
      price: "₹9,800",
      image: "/images/eros.jpg"
    }
  ];

  const roomSprays = [
    {
      name: "Lavender Spray",
      brand: "Air Wick",
      price: "₹299",
      image: "/images/lavenderfrag.jpg"
    },
    {
      name: "Cool Surf Blue",
      brand: "Godrej aer",
      price: "₹249",
      image: "/images/airfreshner.jpg"
    },
    {
      name: "Rose Bloom",
      brand: "Ambi Pur",
      price: "₹349",
      image: "/images/roomspray1.jpg"
    },
    {
      name: "Linen Sky",
      brand: "Febreze",
      price: "₹39",
      image: "/images/homefrag.jpg"
    }
  ];

  const pooja = [
    {
      name: "Sandal Agarbatti",
      brand: "Cycle Pure",
      price: "₹90",
      image: "/images/agarbatti.jpg"
    },
    {
      name: "Divine Incense",
      brand: "Mangaldeep",
      price: "₹120",
      image: "/images/incence.jpg"
    },
    {
      name: "Dhoop Sticks",
      brand: "Cycle Pure",
      price: "₹140",
      image: "/images/dhoop.jpg"
    },
    {
      name: "Incense Cones",
      brand: "Phool",
      price: "₹250",
      image: "/images/cones.jpg"
    }
  ];

  const bathroom = [
    {
      name: "Bathroom Block",
      brand: "Odonil",
      price: "₹75",
      image: "/images/bath.jpg"
    },
    {
      name: "Automatic Freshener",
      brand: "Air Wick",
      price: "₹499",
      image: "/images/auto.jpg"
    },
    {
      name: "Bathroom Spray",
      brand: "Godrej aer",
      price: "₹149",
      image: "/images/bathspary.avif"
    },
    {
      name: "Hygienic Fresh",
      brand: "Harpic",
      price: "₹199",
      image: "/images/bathcleaner.jpg"
    }
  ];

  const candles = [
    {
      name: "Vanilla Candle",
      brand: "Yankee Candle",
      price: "₹1800",
      image: "/images/vennila.jpg"
    },
    {
      name: "Mahogany",
      brand: "Bath & Body Works",
      price: "₹2200",
      image: "/images/magohny.avif"
    },
    {
      name: "Lavender Candle",
      brand: "Miniso",
      price: "₹399",
      image: "/images/lavendercandle.jpg"
    },
    {
      name: "Jasmine Candle",
      brand: "IKEA",
      price: "₹399",
      image: "/images/jasmine.jpg"
    }
  ];

  const oils = [
    {
      name: "Lavender Oil",
      brand: "Soulflower",
      price: "₹499",
      image: "/images/lavoil.jpg"
    },
    {
      name: "Tea Tree Oil",
      brand: "Organic Harvest",
      price: "₹599",
      image: "/images/teaoil.jpg"
    },
    {
      name: "Reed Diffuser",
      brand: "Home Fragrance",
      price: "₹799",
      image: "/images/reedoil.jpg"
    },
    {
      name: "Aroma Diffuser",
      brand: "Generic",
      price: "₹1499",
      image: "/images/aroma.jpg"
    }
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        showToast(`Increased quantity of "${product.name}" in cart! 🌸`);
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`Added "${product.name}" to cart successfully! 🎉`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""), 10);
      return acc + numericPrice * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    showToast("Thank you for shopping at Fragrance Hub! Your checkout is successful. 🎉");
    setCart([]);
    setIsCartOpen(false);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <Hero />

      <ProductSection
        id="perfumes"
        title="🌹 Luxury Perfumes"
        products={perfumes}
        onAddToCart={addToCart}
      />

      <ProductSection
        id="room"
        title="🏠 Room Sprays"
        products={roomSprays}
        onAddToCart={addToCart}
      />

      <ProductSection
        id="pooja"
        title="🪔 Pooja Fragrances"
        products={pooja}
        onAddToCart={addToCart}
      />

      <ProductSection
        id="bathroom"
        title="🚿 Bathroom Fresheners"
        products={bathroom}
        onAddToCart={addToCart}
      />

      <ProductSection
        id="candles"
        title="🕯️ Scented Candles"
        products={candles}
        onAddToCart={addToCart}
      />

      <ProductSection
        id="oils"
        title="🌿 Essential Oils"
        products={oils}
        onAddToCart={addToCart}
      />

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-sidebar-header">
              <h2>Your Cart 🛒</h2>
              <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart-view">
                <p>Your cart is empty.</p>
                <span className="empty-cart-icon">🌸</span>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.name} className="cart-item-row">
                      <img src={resolveImagePath(item.image)} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.price} x {item.quantity}</p>
                      </div>
                      <button className="cart-item-remove-btn" onClick={() => removeFromCart(item.name)}>
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-sidebar-footer">
                  <div className="cart-total-row">
                    <span>Total:</span>
                    <span>₹{calculateTotal(cart).toLocaleString()}</span>
                  </div>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout Now 💳
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      {toast && (
        <div className="toast-notification">
          {toast}
        </div>
      )}
    </>
  );
}

export default App;