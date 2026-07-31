import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from './ibaco.api';
import { useCart } from './CartContext';
import './ibaco.css';

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const orderData = {
      shop: 'ibaco',
      items: cartItems.map((i) => ({
        itemId: i._id,
        name: i.name,
        qty: i.qty,
        price: i.price
      })),
      totalAmount
    };

    try {
      await createOrder(orderData);
    } catch (err) {
      console.warn('Order not saved to backend (not connected yet):', err.message);
    } finally {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }
  };

  if (placed) {
    return (
      <div className="ibaco-checkout-success">
        <h2>🎉 Order Placed!</h2>
        <p>Your Ibaco order has been confirmed. Enjoy your ice cream!</p>
        <button className="ibaco-btn" onClick={() => navigate('/shops/ibaco/menu')}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="ibaco-checkout">
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((i) => (
          <li key={i._id}>{i.name} x {i.qty} — ₹{i.price * i.qty}</li>
        ))}
      </ul>
      <h3>Total: ₹{totalAmount}</h3>
      <button className="ibaco-btn" disabled={placing} onClick={handlePlaceOrder}>
        {placing ? 'Placing Order...' : 'Confirm Order'}
      </button>
    </div>
  );
};

export default Checkout;
