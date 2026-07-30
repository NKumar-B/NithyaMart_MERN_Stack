import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiPackage, FiCheckCircle } from 'react-icons/fi';
import orderService from '../services/orderService';
import OrderCard from '../components/OrderCard';
import Loader from '../components/Loader';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  useEffect(() => {
    orderService.getAllOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader label="Fetching your orders…" />;

  return (
    <div className="container section">
      <h1 className="section-title">Your Orders</h1>
      <p className="section-sub">Track every order from Pending to Completed.</p>

      {justPlaced && (
        <div className="order-success-banner">
          <FiCheckCircle /> Order <strong>{justPlaced}</strong> placed successfully! We'll get cooking right away.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <FiPackage size={48} />
          <h3>No orders yet</h3>
          <p>Once you place an order, it'll show up here with live status updates.</p>
          <Link to="/menu" className="btn btn-primary">Order Something Tasty</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  );
}
