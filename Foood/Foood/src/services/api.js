// ==========================================================================
// Base Axios instance — pre-configured for the future Spring Boot backend.
// Currently unused (app runs on local JSON data) but wired up so the
// individual service files below can switch from local data to real
// HTTP calls by uncommenting the axios calls.
// ==========================================================================
import axios from 'axios';

// Update this to your Spring Boot server URL when the backend is ready.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach auth token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic response/error passthrough — extend with global error handling later
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
