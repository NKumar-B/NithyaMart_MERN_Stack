// ==========================================================================
// Order service — persists orders to localStorage for now so the Orders
// and Admin > Manage Orders pages have real data to work with across a
// session. Structured to be swapped for real axios calls later.
// ==========================================================================
import api from './api';

const STORAGE_KEY = 'fc_orders';
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed'];

export const orderService = {
  // GET /orders
  async getAllOrders() {
    await delay();
    return readOrders().sort((a, b) => b.id - a.id);
    // return (await api.get('/orders')).data;
  },

  // GET /orders/:id
  async getOrderById(id) {
    await delay();
    return readOrders().find((o) => String(o.id) === String(id));
  },

  // POST /orders
  async createOrder(orderPayload) {
    await delay();
    const orders = readOrders();
    const newOrder = {
      id: Date.now(),
      orderNumber: `FC${String(Date.now()).slice(-6)}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...orderPayload,
    };
    orders.push(newOrder);
    writeOrders(orders);
    return newOrder;
    // return (await api.post('/orders', orderPayload)).data;
  },

  // PATCH /orders/:id/status (admin)
  async updateOrderStatus(id, status) {
    await delay();
    const orders = readOrders();
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    writeOrders(updated);
    return updated.find((o) => o.id === id);
    // return (await api.patch(`/orders/${id}/status`, { status })).data;
  },
};

export default orderService;
