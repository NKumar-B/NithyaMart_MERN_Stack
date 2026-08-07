import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, CheckCircle2, Truck, ArrowLeft } from 'lucide-react';
import { processCheckout } from '../../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  onOrderSuccess,
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Processing
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 •••• •••• 8892',
    cardName: 'Alex Morgan',
    expiry: '08/28',
    cvv: '921',
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? subtotal * (appliedCoupon.discount || 0) : 0;
  const shippingFee = (subtotal > 100 || appliedCoupon?.freeShipping) ? 0 : 7.99;
  const taxFee = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const grandTotal = Number((subtotal - discountAmount + shippingFee + taxFee).toFixed(2));

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.address || !shippingAddress.city) {
      setErrorMsg('Please fill in all required shipping address fields.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setStep(3); // Processing state

    try {
      const orderPayload = {
        items: cart,
        shippingAddress,
        paymentMethod,
        couponCode: appliedCoupon?.code || null,
      };

      // Call Express REST API endpoint
      const response = await processCheckout(orderPayload);

      setTimeout(() => {
        setLoading(false);
        if (response.success) {
          onOrderSuccess(response.order);
        } else {
          setErrorMsg(response.message || 'Payment failed');
          setStep(2);
        }
      }, 1500); // Realistic 1.5s gateway delay simulation
    } catch (err) {
      setLoading(false);
      setErrorMsg('Server payment connection error. Please try again.');
      setStep(2);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose} disabled={step === 3}>
          <X size={18} />
        </button>

        {/* Step Indicator Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: step >= 1 ? '#06b6d4' : '#64748b', fontWeight: 'bold', fontSize: '0.9rem' }}>
            <span>1. Shipping</span>
          </div>
          <span style={{ color: '#64748b' }}>➔</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: step >= 2 ? '#06b6d4' : '#64748b', fontWeight: 'bold', fontSize: '0.9rem' }}>
            <span>2. Payment Gateway</span>
          </div>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', color: '#f43f5e', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {errorMsg}
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>Shipping Address Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="search-input"
                  style={{ borderRadius: '6px' }}
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@sports.com"
                  className="search-input"
                  style={{ borderRadius: '6px' }}
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>Street Address *</label>
              <input
                type="text"
                name="address"
                required
                placeholder="123 Stadium Way, Suite 400"
                className="search-input"
                style={{ borderRadius: '6px' }}
                value={shippingAddress.address}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Los Angeles"
                  className="search-input"
                  style={{ borderRadius: '6px' }}
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>State / Region</label>
                <input
                  type="text"
                  name="state"
                  placeholder="CA"
                  className="search-input"
                  style={{ borderRadius: '6px' }}
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  placeholder="90001"
                  className="search-input"
                  style={{ borderRadius: '6px' }}
                  value={shippingAddress.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-block" style={{ marginTop: '0.5rem' }}>
              Continue to Payment Details ➔
            </button>
          </form>
        )}

        {/* Step 2: Payment Gateway Simulation */}
        {step === 2 && (
          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                className="nav-btn"
                onClick={() => setStep(1)}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
              >
                <ArrowLeft size={14} /> Back to Shipping
              </button>
              <span style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Lock size={14} /> 256-Bit SSL Encrypted
              </span>
            </div>

            {/* Simulated Card Preview Visualizer */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e3a8a, #0284c7)',
                borderRadius: '12px',
                padding: '1.2rem',
                color: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 800, letterSpacing: '0.05em' }}>APEX SPORT PASS</span>
                <CreditCard size={24} />
              </div>
              <div style={{ fontSize: '1.2rem', letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: '1rem' }}>
                {cardDetails.cardNumber}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.7rem' }}>CARDHOLDER</div>
                  <div style={{ fontWeight: 'bold' }}>{cardDetails.cardName.toUpperCase()}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.7rem' }}>EXPIRES</div>
                  <div style={{ fontWeight: 'bold' }}>{cardDetails.expiry}</div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {['Credit Card', 'PayPal / Digital Wallet', 'Cash on Delivery'].map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`cat-tab ${paymentMethod === method ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(method)}
                  style={{ flex: 1, padding: '0.6rem 0.4rem', fontSize: '0.78rem', textAlign: 'center' }}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod === 'Credit Card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="search-input"
                    style={{ borderRadius: '6px' }}
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      className="search-input"
                      style={{ borderRadius: '6px' }}
                      value={cardDetails.cardName}
                      onChange={handleCardChange}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      className="search-input"
                      style={{ borderRadius: '6px' }}
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Total Order Summary */}
            <div style={{ background: '#131b2e', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Total to Charge:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4' }}>${grandTotal.toFixed(2)}</span>
              </div>
              <button type="submit" className="btn-block" style={{ width: 'auto', padding: '0.8rem 1.8rem' }}>
                Pay & Complete Order
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Gateway Processing State */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div className="logo-badge" style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem auto', animation: 'spin 1s linear infinite' }}>
              <Lock size={32} />
            </div>
            <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Processing Payment & Order...</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Connecting to secure banking gateway. Please do not close or refresh this window.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}