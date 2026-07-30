import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/formatPrice';
import './Cart.css';

const PACKAGING_FEE = 15;

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <FiShoppingBag size={48} />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet. Let's fix that!</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  const grandTotal = totalPrice + PACKAGING_FEE;

  return (
    <div className="container section cart-page">
      <div className="section-head">
        <div>
          <h1 className="section-title">Your Cart</h1>
          <p className="section-sub">{items.length} item{items.length > 1 ? 's' : ''} ready for checkout.</p>
        </div>
        <button className="btn btn-ghost" onClick={clearCart}>
          <FiTrash2 /> Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {items.map((item) => <CartItem key={item.id} item={item} />)}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Packaging fee</span>
            <span>{formatPrice(PACKAGING_FEE)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
            Proceed to Checkout <FiArrowRight />
          </button>
          <Link to="/menu" className="continue-shopping">+ Add more items</Link>
        </aside>
      </div>
    </div>
  );
}
