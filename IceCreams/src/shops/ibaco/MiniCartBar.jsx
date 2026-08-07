import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './ibaco.css';

const MiniCartBar = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();

  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  if (itemCount === 0) return null;

  return (
    <div className="ibaco-minicart-bar" onClick={() => navigate('/shops/ibaco/cart')}>
      <span>
        🛒 {itemCount} item{itemCount > 1 ? 's' : ''} in cart
      </span>
      <span className="ibaco-minicart-total">₹{totalAmount}</span>
      <button className="ibaco-btn small">View Cart</button>
    </div>
  );
};

export default MiniCartBar;
