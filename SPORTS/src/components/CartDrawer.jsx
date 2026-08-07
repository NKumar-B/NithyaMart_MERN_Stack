import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { validateCoupon } from '../../services/api';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedCoupon,
  setAppliedCoupon,
}) {
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? subtotal * (appliedCoupon.discount || 0) : 0;
  const shippingFee = (subtotal > 100 || appliedCoupon?.freeShipping) ? 0 : (subtotal > 0 ? 7.99 : 0);
  const taxFee = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const grandTotal = Number((subtotal - discountAmount + shippingFee + taxFee).toFixed(2));

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    try {
      setCouponError('');
      setCouponSuccess('');
      const res = await validateCoupon(couponCodeInput);
      if (res.success) {
        setAppliedCoupon(res);
        setCouponSuccess(`Coupon ${res.code} Applied (${res.description})`);
        setCouponCodeInput('');
      } else {
        setCouponError(res.message || 'Invalid Coupon Code');
      }
    } catch (err) {
      setCouponError('Error validating coupon. Try "SPORT20"');
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 style={{ fontSize: '1.2rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="#2563eb" />
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button className="close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', color: '#94a3b8' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>Your sports wear cart is currently empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-meta">
                    Size: <strong>{item.selectedSize || 'M'}</strong> • {item.selectedColor || 'Standard'}
                  </div>
                  <div style={{ fontWeight: 800, color: '#06b6d4', marginTop: '0.2rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}>
                      <Plus size={12} />
                    </button>
                    <button
                      className="qty-btn"
                      style={{ marginLeft: 'auto', color: '#f43f5e', border: 'none' }}
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer Summary */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo code form */}
            <form onSubmit={handleApplyCoupon} className="promo-row">
              <input
                type="text"
                className="search-input"
                placeholder='Coupon code (e.g. "SPORT20")'
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value)}
                style={{ borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="nav-btn" style={{ borderRadius: '6px', fontSize: '0.85rem' }}>
                <Tag size={14} /> Apply
              </button>
            </form>
            {couponSuccess && <p style={{ fontSize: '0.78rem', color: '#10b981' }}>{couponSuccess}</p>}
            {couponError && <p style={{ fontSize: '0.78rem', color: '#f43f5e' }}>{couponError}</p>}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>Discount ({appliedCoupon?.code}):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping:</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Est. Tax (8%):</span>
                <span>${taxFee.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: '#f8fafc',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span>Total Amount:</span>
                <span style={{ color: '#06b6d4' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-block" onClick={onProceedToCheckout}>
              Proceed to Payment <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.4rem' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}