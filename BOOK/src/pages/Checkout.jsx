import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookStore } from "../context/BookStoreContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    discount,
    total,
    appliedCoupon,
    clearCart,
    cartCount
  } = useBookStore();

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "cod",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
    saveInfo: false
  });

  const [errors, setErrors] = useState({});

  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 49;
  const grandTotal = total + shipping;
  const orderNumber = "BH" + Math.floor(100000 + Math.random() * 900000);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone))
      newErrors.phone = "Invalid phone";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.state.trim()) newErrors.state = "Required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.paymentMethod === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Required";
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Required";
      else if (formData.cardNumber.replace(/\s/g, "").length < 12)
        newErrors.cardNumber = "Invalid card";
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Required";
      if (!formData.cardCvv.trim()) newErrors.cardCvv = "Required";
    } else if (formData.paymentMethod === "upi") {
      if (!formData.upiId.trim()) newErrors.upiId = "Required";
      else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId))
        newErrors.upiId = "Invalid UPI ID";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) {
      setOrderPlaced(true);
      setTimeout(() => {
        clearCart();
      }, 1500);
    }
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="page-header">
          <div className="page-header-inner">
            <span className="page-breadcrumb">🏠 Home / Checkout</span>
            <h1 className="page-title">🔒 Checkout</h1>
            <p className="page-description">Complete your order</p>
          </div>
        </div>
        <div className="checkout-container">
          <div className="empty-wishlist">
            <span className="empty-wishlist-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add some books first to proceed to checkout.</p>
            <Link to="/books" className="btn btn-primary">
              Browse Books →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="page-header">
          <div className="page-header-inner">
            <span className="page-breadcrumb">🏠 Home / Success</span>
            <h1 className="page-title">🎉 Order Placed!</h1>
            <p className="page-description">Thank you for your purchase</p>
          </div>
        </div>
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-checkmark">✓</div>
            <h2>Order Confirmed!</h2>
            <p className="order-number-text">
              Order #<strong>{orderNumber}</strong>
            </p>
            <div className="order-summary-box">
              <div className="success-row">
                <span>📦 Items</span>
                <strong>{cartCount}</strong>
              </div>
              <div className="success-row">
                <span>👤 Name</span>
                <strong>
                  {formData.firstName} {formData.lastName}
                </strong>
              </div>
              <div className="success-row">
                <span>📍 Delivery</span>
                <strong>
                  {formData.city}, {formData.state}
                </strong>
              </div>
              <div className="success-row total">
                <span>💰 Total Paid</span>
                <strong>₹{grandTotal}</strong>
              </div>
            </div>
            <p className="thankyou-text">
              A confirmation email has been sent to <strong>{formData.email}</strong>.
              Your books will arrive in 3–5 business days. 📚✨
            </p>
            <div className="success-actions">
              <Link to="/books" className="btn btn-secondary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <div className="page-header-inner">
          <span className="page-breadcrumb">🏠 Home / Checkout</span>
          <h1 className="page-title">🔒 Secure Checkout</h1>
          <p className="page-description">
            Complete your {cartCount} item{cartCount > 1 ? "s" : ""} purchase
          </p>
        </div>
      </div>

      <div className="checkout-container">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}>
            <div className="step-circle">{step > 1 ? "✓" : "1"}</div>
            <span>Shipping</span>
          </div>
          <div className="step-divider" />
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <div className="step-circle">2</div>
            <span>Payment</span>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            {step === 1 && (
              <div className="checkout-step">
                <h2>📮 Shipping Address</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <span className="field-error">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <span className="field-error">{errors.lastName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <span className="field-error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <span className="field-error">{errors.phone}</span>
                    )}
                  </div>
                  <div className="form-group full">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? "error" : ""}
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && (
                      <span className="field-error">{errors.address}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "error" : ""}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <span className="field-error">{errors.city}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? "error" : ""}
                      placeholder="Maharashtra"
                    />
                    {errors.state && (
                      <span className="field-error">{errors.state}</span>
                    )}
                  </div>
                  <div className="form-group full-zip">
                    <label>ZIP / Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? "error" : ""}
                      placeholder="400001"
                    />
                    {errors.zipCode && (
                      <span className="field-error">{errors.zipCode}</span>
                    )}
                  </div>
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                  />
                  Save this information for next time
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-step">
                <h2>💳 Payment Method</h2>
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === "cod" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <span className="payment-icon">💵</span>
                      <div>
                        <strong>Cash on Delivery</strong>
                        <small>Pay when you receive the books</small>
                      </div>
                    </div>
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === "card" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <span className="payment-icon">💳</span>
                      <div>
                        <strong>Credit / Debit Card</strong>
                        <small>Visa, Mastercard, Rupay accepted</small>
                      </div>
                    </div>
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === "upi" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <span className="payment-icon">📱</span>
                      <div>
                        <strong>UPI</strong>
                        <small>GPay, PhonePe, Paytm, etc.</small>
                      </div>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="payment-details-form">
                    <div className="form-group full">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={errors.cardName ? "error" : ""}
                        placeholder="JOHN DOE"
                      />
                      {errors.cardName && (
                        <span className="field-error">{errors.cardName}</span>
                      )}
                    </div>
                    <div className="form-group full">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={errors.cardNumber ? "error" : ""}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <span className="field-error">{errors.cardNumber}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className={errors.cardExpiry ? "error" : ""}
                        placeholder="MM/YY"
                      />
                      {errors.cardExpiry && (
                        <span className="field-error">{errors.cardExpiry}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        className={errors.cardCvv ? "error" : ""}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cardCvv && (
                        <span className="field-error">{errors.cardCvv}</span>
                      )}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "upi" && (
                  <div className="payment-details-form">
                    <div className="form-group full">
                      <label>UPI ID *</label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        className={errors.upiId ? "error" : ""}
                        placeholder="yourname@okhdfcbank"
                      />
                      {errors.upiId && (
                        <span className="field-error">{errors.upiId}</span>
                      )}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "cod" && (
                  <div className="cod-note">
                    💡 <strong>Note:</strong> Keep exact change ready. ₹{grandTotal} will
                    be collected upon delivery.
                  </div>
                )}
              </div>
            )}

            <div className="checkout-nav-buttons">
              {step > 1 ? (
                <button className="btn btn-secondary" onClick={prevStep}>
                  ← Back
                </button>
              ) : (
                <Link to="/cart" className="btn btn-secondary">
                  ← Back to Cart
                </Link>
              )}
              <button className="btn btn-primary" onClick={nextStep}>
                {step === 1 ? "Continue to Payment →" : `💰 Place Order · ₹${grandTotal}`}
              </button>
            </div>
          </div>

          <aside className="checkout-summary">
            <h3>📦 Order Summary</h3>
            <div className="checkout-items">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.title} />
                  <div className="ci-details">
                    <strong className="ci-title">{item.title}</strong>
                    <span className="ci-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="ci-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <hr className="divider" />
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="price-row discount-row">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>−₹{discount}</span>
                </div>
              )}
              <div className="price-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="free-label">FREE</strong>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <hr className="divider" />
              <div className="price-row total-row">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            <div className="secure-badge">
              🔒 100% Secure. Your info is encrypted and protected.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
