import axios from 'axios';

// Change this to your deployed/local backend base URL
const BASE_URL = 'http://localhost:5000/api/ibaco';

export const getItems = (category) =>
  axios.get(`${BASE_URL}/items`, { params: category ? { category } : {} });

export const getItemById = (id) =>
  axios.get(`${BASE_URL}/items/${id}`);

export const createOrder = (orderData) =>
  axios.post(`${BASE_URL}/orders`, orderData);

export const getUserOrders = (userId) =>
  axios.get(`${BASE_URL}/orders/${userId}`);

// Admin
export const createItem = (itemData) =>
  axios.post(`${BASE_URL}/items`, itemData);

export const updateItem = (id, itemData) =>
  axios.put(`${BASE_URL}/items/${id}`, itemData);

export const deleteItem = (id) =>
  axios.delete(`${BASE_URL}/items/${id}`);
