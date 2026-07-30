import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import orderService, { ORDER_STATUSES } from '../../services/orderService';
import Loader from '../../components/Loader';
import { formatPrice } from '../../utils/formatPrice';
import { nextStatus, statusClass } from '../../utils/orderStatus';
import './Dashboard.css';
import './ManageOrders.css';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    orderService.getAllOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const handleAdvance = async (order) => {
    const newStatus = nextStatus(order.status);
    if (newStatus === order.status) return;
    const updated = await orderService.updateOrderStatus(order.id, newStatus);
    setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
  };

  const handleStatusChange = async (order, status) => {
    const updated = await orderService.updateOrderStatus(order.id, status);
    setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
  };

  const filtered = statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter);

  if (loading) return <Loader label="Pulling up orders…" />;

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Manage Orders</h1>
          <p>Move orders through Pending → Preparing → Ready → Completed.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        {['All', ...ORDER_STATUSES].map((status) => (
          <button
            key={status}
            className={`filter-chip ${statusFilter === status ? 'filter-chip-active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Counter</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td><strong>{order.orderNumber}</strong></td>
                <td>{order.customerName}<br /><span className="muted-sub">{order.phone}</span></td>
                <td>{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                <td>#{order.counter}</td>
                <td>{formatPrice(order.total)}</td>
                <td>
                  <select
                    className={`status-select ${statusClass(order.status)}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                  >
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleAdvance(order)}
                    disabled={order.status === 'Completed'}
                  >
                    Advance <FiChevronRight />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No orders here</h3>
            <p>Orders placed by customers will appear in this list.</p>
          </div>
        )}
      </div>
    </div>
  );
}
