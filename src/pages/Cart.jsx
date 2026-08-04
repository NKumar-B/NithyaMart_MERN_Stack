import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookStore } from "../context/BookStoreContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    cartCount,
    addToCart,
    toggleWishlist
  } = useBookStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const result = applyCoupon(couponInput);
    setCouponMessage(result);
    setCouponInput("");
    setTimeout(() => setCouponMessage(null), 4000);
  };

  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 49;
  const grandTotal = total + shipping;

  return (
    <div className="cart-page">
      <div className="page-header">
        <div className="page-header-inner">
          <span className="page-breadcrumb">🏠 Home / Cart</span>
          <h1 className="page-title">🛒 Your Shopping Cart</h1>
          <p className="page-description">
            {cartCount === 0
              ? "Your cart is empty"
              : `You have ${cartCount} item${cartCount > 1 ? "s" : ""} in your cart`}
          </p>
        </div>
      </div>

      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any books to your cart yet.</p>
            <Link to="/books" className="btn btn-primary">
              Browse Books →
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>Cart Items ({cartCount})</h2>
                <button className="clear-cart-btn" onClick={clearCart}>
                  🗑️ Clear Cart
                </button>
              </div>

              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-details">
                      <span className="cart-item-category">{item.category}</span>
                      <h3 className="cart-item-title">{item.title}</h3>
                      <p className="cart-item-author">by {item.author}</p>
                      <div className="cart-item-actions">
                        <button
                          className="cart-icon-btn wishlist-action"
                          onClick={() => toggleWishlist(item)}
                          title="Move to wishlist"
                        >
                          ❤️ Move to Wishlist
                        </button>
                        <button
                          className="cart-icon-btn remove-action"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove from cart"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-pricing">
                        <span className="item-price-each">₹{item.price} each</span>
                        <span className="item-price-total">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="coupon-section">
                <h3>🎁 Apply Coupon</h3>
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <button
                      type="button"
                      className="coupon-remove-btn"
                      onClick={removeCoupon}
                    >
                      Remove
                    </button>
                  ) : (
                    <button type="submit" className="coupon-apply-btn">
                      Apply
                    </button>
                  )}
                </form>

                {couponMessage && (
                  <p className={`coupon-message ${couponMessage.success ? "success" : "error"}`}>
                    {couponMessage.message}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="applied-coupon">
                    ✅ <strong>{appliedCoupon.code}</strong> applied — {appliedCoupon.description}
                  </div>
                )}

                <div className="available-coupons">
                  <p className="available-label">Available coupons:</p>
                  {coupons.map((c) => (
                    <div key={c.code} className="coupon-chip">
                      <strong>{c.code}</strong>
                      <span>
                        {c.type === "percent" ? `${c.discount}%` : `₹${c.discount}`} OFF
                        {c.minOrder && ` · Min ₹${c.minOrder}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal ({cartCount} items)</span>
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
                {shipping > 0 && (
                  <p className="shipping-hint">
                    Add ₹{500 - subtotal} more for FREE shipping!
                  </p>
                )}
                <hr className="divider" />
                <div className="price-row total-row">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                🔒 Proceed to Checkout
              </button>
              <Link to="/books" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
