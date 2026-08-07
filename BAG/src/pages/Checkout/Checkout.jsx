import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiDetails, setUpiDetails] = useState({ id: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 12000 || subtotal === 0 ? 0 : 499;
  const total = subtotal + gst + shipping;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleUpiChange = (e) => {
    setUpiDetails({ ...upiDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Simulate ordering process
    const randomId = "LXB-" + Math.floor(100000 + Math.random() * 900000) + "-IN";
    setOrderId(randomId);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="checkout-success-page">
          <div className="container success-container">
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <h2>Order Placed Successfully!</h2>
              <p className="order-id">Order ID: <strong>{orderId}</strong></p>
              
              <div className="success-details">
                <p>Thank you for shopping with <strong>LuxeBags</strong>, {formData.name}.</p>
                <p>We've sent a receipt and delivery updates to <strong>{formData.email}</strong>.</p>
                <p>Your premium bag is being packed by our master craftspeople and will reach your address in 3–5 business days.</p>
              </div>

              <div className="success-address">
                <h4>Delivery Address:</h4>
                <p>{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
              </div>

              <button className="back-home-btn" onClick={() => navigate("/")}>
                Back to Store
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
      <main className="checkout-page">
        <div className="container">
          <SectionTitle subtitle="Secure Checkout" title="Complete Your Order" />
          
          {cart.length === 0 ? (
            <div className="checkout-empty">
              <p>You have no products in your cart to checkout.</p>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="checkout-layout">
              <div className="checkout-form-section">
                
                {/* Shipping Form */}
                <div className="checkout-card">
                  <h3>Shipping Details</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. Nithin Kumar"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. nithin@luxebags.com"
                      />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group full-width">
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
                    <div className="form-group">
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
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleFormChange} 
                        required 
                        placeholder="e.g. Telangana"
                      />
                    </div>
                    <div className="form-group">
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

                {/* Payment Section */}
                <div className="checkout-card payment-card">
                  <h3>Payment Method</h3>
                  
                  <div className="payment-options">
                    <label className={`payment-option-label ${paymentMethod === "card" ? "active" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={paymentMethod === "card"} 
                        onChange={() => setPaymentMethod("card")} 
                      />
                      <span className="payment-radio-custom"></span>
                      <div>
                        <strong>Credit / Debit Card</strong>
                        <p>Pay securely with Visa, Mastercard, or RuPay</p>
                      </div>
                    </label>

                    <label className={`payment-option-label ${paymentMethod === "upi" ? "active" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="upi" 
                        checked={paymentMethod === "upi"} 
                        onChange={() => setPaymentMethod("upi")} 
                      />
                      <span className="payment-radio-custom"></span>
                      <div>
                        <strong>UPI (GPay, PhonePe, Paytm)</strong>
                        <p>Pay instantly using your UPI app</p>
                      </div>
                    </label>

                    <label className={`payment-option-label ${paymentMethod === "cod" ? "active" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={paymentMethod === "cod"} 
                        onChange={() => setPaymentMethod("cod")} 
                      />
                      <span className="payment-radio-custom"></span>
                      <div>
                        <strong>Cash on Delivery (COD)</strong>
                        <p>Pay with cash upon delivery of your bag</p>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="payment-details card-details-form">
                      <div className="form-group full-width">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input 
                          type="text" 
                          id="cardNumber" 
                          name="number" 
                          value={cardDetails.number} 
                          onChange={handleCardChange} 
                          required={paymentMethod === "card"} 
                          placeholder="XXXX XXXX XXXX XXXX"
                          maxLength="16"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Expiry Date</label>
                        <input 
                          type="text" 
                          id="cardExpiry" 
                          name="expiry" 
                          value={cardDetails.expiry} 
                          onChange={handleCardChange} 
                          required={paymentMethod === "card"} 
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardCvv">CVV</label>
                        <input 
                          type="password" 
                          id="cardCvv" 
                          name="cvv" 
                          value={cardDetails.cvv} 
                          onChange={handleCardChange} 
                          required={paymentMethod === "card"} 
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="payment-details upi-details-form">
                      <div className="form-group full-width">
                        <label htmlFor="upiId">UPI ID</label>
                        <input 
                          type="text" 
                          id="upiId" 
                          name="id" 
                          value={upiDetails.id} 
                          onChange={handleUpiChange} 
                          required={paymentMethod === "upi"} 
                          placeholder="e.g. mobile@upi"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="payment-details cod-details-message">
                      <p>✨ Additional charge of ₹99 may apply for COD. Please keep exact change ready during delivery.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="checkout-summary-section">
                <div className="checkout-card summary-card">
                  <h3>Order Summary</h3>
                  
                  <div className="summary-items">
                    {cart.map((item) => (
                      <div key={item.id} className="summary-item-row">
                        {item.image && <img src={item.image} alt={item.name} className="summary-item-img" />}
                        <div className="summary-item-info">
                          <h4>{item.name}</h4>
                          <p>{item.brand}</p>
                        </div>
                        <span className="summary-item-price">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="summary-divider" />

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
                    <span>Total Amount</span>
                    <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
                  </div>

                  <button type="submit" className="place-order-btn">
                    Place Order (₹{total.toLocaleString('en-IN')})
                  </button>
                  
                  <Link to="/cart" className="back-cart-link">
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

export default Checkout;
