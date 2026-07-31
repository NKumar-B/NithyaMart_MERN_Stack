import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './ibaco.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="ibaco-cart-empty">
        <p>Your Ibaco cart is empty 🍦</p>
        <Link to="/shops/ibaco/menu" className="ibaco-btn">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="ibaco-cart">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div className="ibaco-cart-row" key={item._id}>
          <img src={item.image} alt={item.name} />
          <div className="ibaco-cart-row-info">
            <h4>{item.name}</h4>
            <p>₹{item.price} x {item.qty} = ₹{item.price * item.qty}</p>
            <div className="ibaco-qty-controls">
              <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              <button className="ibaco-remove" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}

      <div className="ibaco-cart-total">
        <h3>Total: ₹{totalAmount}</h3>
        <button className="ibaco-btn" onClick={() => navigate('/shops/ibaco/checkout')}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
