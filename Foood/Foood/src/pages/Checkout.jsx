import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiPhone, FiHash, FiCreditCard, FiSmartphone, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import { formatPrice } from '../utils/formatPrice';
import './Checkout.css';

const PACKAGING_FEE = 15;

const paymentMethods = [
  { id: 'card', label: 'Card', icon: <FiCreditCard /> },
  { id: 'upi', label: 'UPI', icon: <FiSmartphone /> },
  { id: 'cash', label: 'Cash at Counter', icon: <FiDollarSign /> },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    counter: '',
    payment: 'upi',
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h3>Nothing to checkout</h3>
        <p>Add a few tasty items to your cart first.</p>
        <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
      </div>
    );
  }

  const grandTotal = totalPrice + PACKAGING_FEE;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number.';
    if (!form.counter.trim()) errs.counter = 'Please enter a pickup counter number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    try {
      const order = await orderService.createOrder({
        customerName: form.name,
        phone: form.phone,
        counter: form.counter,
        paymentMethod: form.payment,
        items,
        total: grandTotal,
      });
      clearCart();
      navigate('/orders', { state: { justPlaced: order.orderNumber } });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container section checkout-page">
      <h1 className="section-title">Checkout</h1>
      <p className="section-sub">Just a few details and your order heads to the kitchen.</p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name"><FiUser /> Customer Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone"><FiPhone /> Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 9876543210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="counter"><FiHash /> Pickup Counter Number</label>
            <input
              id="counter"
              type="text"
              placeholder="e.g. 4"
              value={form.counter}
              onChange={(e) => setForm({ ...form, counter: e.target.value })}
            />
            {errors.counter && <span className="field-error">{errors.counter}</span>}
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <div className="payment-options">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method.id}
                  className={`payment-option ${form.payment === method.id ? 'payment-option-active' : ''}`}
                  onClick={() => setForm({ ...form, payment: method.id })}
                >
                  {method.icon} {method.label}
                </button>
              ))}
            </div>
            <span className="payment-note">UI only — no live payment is processed in this demo.</span>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={placing}>
            {placing ? 'Placing Order…' : <><FiCheckCircle /> Place Order · {formatPrice(grandTotal)}</>}
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span><img src={item.imageUrl} alt={item.name} className="checkout-item-img" loading="lazy" /> {item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
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
        </aside>
      </div>
    </div>
  );
}
