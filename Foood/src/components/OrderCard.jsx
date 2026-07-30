import { FiClock, FiHash, FiMapPin } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import { STATUS_FLOW, statusClass } from '../utils/orderStatus';
import './OrderCard.css';

export default function OrderCard({ order, children }) {
  const activeIndex = STATUS_FLOW.indexOf(order.status);

  return (
    <div className="order-card">
      <div className="order-card-head">
        <div>
          <span className="order-number"><FiHash /> {order.orderNumber}</span>
          <span className="order-date"><FiClock /> {new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <span className={`status-pill ${statusClass(order.status)}`}>{order.status}</span>
      </div>

      <div className="order-progress">
        {STATUS_FLOW.map((step, i) => (
          <div key={step} className={`order-step ${i <= activeIndex ? 'order-step-done' : ''}`}>
            <span className="order-step-dot" />
            <span className="order-step-label">{step}</span>
          </div>
        ))}
      </div>

      <ul className="order-items">
        {order.items.map((item) => (
          <li key={item.id}>
            <span><img src={item.imageUrl} alt={item.name} className="order-item-img" loading="lazy" /> {item.name} × {item.quantity}</span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="order-card-footer">
        <span className="order-counter"><FiMapPin /> Counter {order.counter || '—'}</span>
        <span className="order-total">Total: <strong>{formatPrice(order.total)}</strong></span>
      </div>

      {children && <div className="order-card-actions">{children}</div>}
    </div>
  );
}
