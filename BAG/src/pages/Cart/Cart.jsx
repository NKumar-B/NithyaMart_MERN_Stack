import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useShop } from "../../context/ShopContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, toggleWishlist, wishlist } = useShop();
  const navigate = useNavigate();

  const isWishlisted = (itemId) =>
    wishlist.some((item) => item.id === itemId);

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 12000 || subtotal === 0 ? 0 : 499;
  const total = subtotal + gst + shipping;

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <div className="container">
          <SectionTitle subtitle="Your selections" title="Shopping Cart" />

          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty. Add a premium bag to get started.</p>
              <Link to="/" className="cart-back-link">
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-grid">
                {cart.map((item) => (
                  <article className="cart-card" key={item.id}>
                    {item.image && (
                      <div className="cart-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                    )}
                    <div className="cart-details">
                      <p className="cart-badge">{item.badge}</p>
                      <h3>{item.name}</h3>
                      <p className="cart-brand">{item.brand}</p>
                      <div className="cart-meta">
                        <span>₹{item.price}</span>
                        <small>{item.discount}% OFF</small>
                      </div>
                      <div className="cart-actions">
                        <button
                          type="button"
                          className="cart-wishlist-btn"
                          onClick={() => toggleWishlist(item)}
                        >
                          {isWishlisted(item.id)
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </button>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-row total-row">
                  <span>Grand Total</span>
                  <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  type="button" 
                  className="checkout-btn" 
                  onClick={() => navigate("/checkout")}
                >
                  Buy Now
                </button>
                <Link to="/" className="continue-shopping-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
