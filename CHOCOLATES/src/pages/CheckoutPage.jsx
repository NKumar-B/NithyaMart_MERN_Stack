import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + gst + shipping;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Simulate ordering process
    const randomId = "CHOC-" + Math.floor(100000 + Math.random() * 900000) + "-IN";
    setOrderId(randomId);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="choc-checkout-success">
          <div className="choc-container">
            <div className="choc-success-card">
              <div className="choc-success-icon">🍫✨</div>
              <h2>Order Placed Successfully!</h2>
              <p className="choc-order-id">Order ID: <strong>{orderId}</strong></p>
              
              <div className="choc-success-details">
                <p>Thank you for buying premium confections from <strong>ChocoLux</strong>, {formData.name}.</p>
                <p>We have received your payment and are packing your delicious chocolates right now.</p>
                <p>They will be delivered to your doorstep in 2–4 business days in cold-insulated packages.</p>
              </div>

              <button className="choc-back-home-btn" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="choc-checkout-page">
        <div className="choc-container">
          <h1 className="choc-checkout-title">Checkout 🍫</h1>
          
          {cartItems.length === 0 ? (
            <div className="choc-checkout-empty">
              <p>Your cart is empty. Add some delicious chocolates first!</p>
              <Link to="/" className="choc-continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="choc-checkout-layout">
              <div className="choc-checkout-form-section">
                
                {/* Shipping Details */}
                <div className="choc-checkout-card">
                  <h3>Delivery Information</h3>
                  <div className="choc-form-grid">
                    <div className="choc-form-group full-width">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. Pavani"
                      />
                    </div>
                    <div className="choc-form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. pavani@gmail.com"
                      />
                    </div>
                    <div className="choc-form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. +91 9876543210"
                      />
                    </div>
                    <div className="choc-form-group full-width">
                      <label htmlFor="address">Shipping Address</label>
                      <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="Street address, apartment, suite"
                      />
                    </div>
                    <div className="choc-form-group">
                      <label htmlFor="city">City</label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. Hyderabad"
                      />
                    </div>
                    <div className="choc-form-group">
                      <label htmlFor="pincode">PIN Code</label>
                      <input 
                        type="text" 
                        id="pincode" 
                        name="pincode" 
                        value={formData.pincode} 
                        onChange={handleFormChange} 
                        required 
                        pattern="^[0-9]{6}$" 
                        placeholder="6-digit PIN code"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="choc-checkout-card">
                  <h3>Payment Method</h3>
                  <div className="choc-payment-options">
                    <label className={`choc-payment-label ${paymentMethod === "upi" ? "active" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="upi" 
                        checked={paymentMethod === "upi"} 
                        onChange={() => setPaymentMethod("upi")} 
                      />
                      <span>UPI (GPay / PhonePe / Paytm)</span>
                    </label>

                    <label className={`choc-payment-label ${paymentMethod === "card" ? "active" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={paymentMethod === "card"} 
                        onChange={() => setPaymentMethod("card")} 
                      />
                      <span>Credit or Debit Card</span>
                    </label>

                    <label className={`choc-payment-label ${paymentMethod === "cod" ? "active" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={paymentMethod === "cod"} 
                        onChange={() => setPaymentMethod("cod")} 
                      />
                      <span>Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="choc-checkout-summary-section">
                <div className="choc-checkout-card summary-card">
                  <h3>Order Summary</h3>
                  
                  <div className="choc-summary-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="choc-summary-item-row">
                        {item.image && <img src={item.image} alt={item.name} className="choc-summary-item-img" />}
                        <div className="choc-summary-item-info">
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <span className="choc-summary-item-price">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="choc-summary-divider" />

                  <div className="choc-summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="choc-summary-row">
                    <span>GST (18%)</span>
                    <span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="choc-summary-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>

                  <hr className="choc-summary-divider" />

                  <div className="choc-summary-row total-row">
                    <span>Total Amount</span>
                    <span className="choc-total-amount">₹{total.toLocaleString('en-IN')}</span>
                  </div>

                  <button type="submit" className="choc-place-order-btn">
                    Place Order (₹{total.toLocaleString('en-IN')})
                  </button>
                  
                  <Link to="/cart" className="choc-back-cart-link">
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CheckoutPage;
