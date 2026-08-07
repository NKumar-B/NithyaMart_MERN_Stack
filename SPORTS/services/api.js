const API_BASE = 'http://localhost:5000/api';

export const fetchProducts = async (filters = {}) => {
  const query = new URLSearchParams();
  if (filters.gender && filters.gender !== 'All') query.append('gender', filters.gender);
  if (filters.category && filters.category !== 'All') query.append('category', filters.category);
  if (filters.brand && filters.brand !== 'All') query.append('brand', filters.brand);
  if (filters.search) query.append('search', filters.search);
  if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
  if (filters.sort) query.append('sort', filters.sort);
  if (filters.featured) query.append('featured', 'true');

  const res = await fetch(`${API_BASE}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

export const fetchMetadata = async () => {
  const res = await fetch(`${API_BASE}/products/meta/categories`);
  if (!res.ok) throw new Error('Failed to load metadata');
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

export const validateCoupon = async (code) => {
  const res = await fetch(`${API_BASE}/orders/validate-coupon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return res.json();
};

export const processCheckout = async (orderPayload) => {
  const res = await fetch(`${API_BASE}/orders/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload),
  });
  return res.json();
};