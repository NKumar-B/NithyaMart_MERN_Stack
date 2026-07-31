// ==========================================================================
// Auth service — mock login/register using localStorage. Swap the two
// commented axios calls in when the Spring Boot auth endpoints exist.
// ==========================================================================
import api from './api';

const USERS_KEY = 'fc_users';
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const authService = {
  // POST /auth/register
  async register({ name, email, phone, password }) {
    await delay();
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const user = { id: Date.now(), name, email, phone, role: 'customer' };
    users.push({ ...user, password });
    writeUsers(users);
    localStorage.setItem('fc_token', `mock-token-${user.id}`);
    localStorage.setItem('fc_user', JSON.stringify(user));
    return user;
    // return (await api.post('/auth/register', payload)).data;
  },

  // POST /auth/login
  async login({ email, password }) {
    await delay();

    // Built-in admin demo login
    if (email === 'admin@foodcourt.com' && password === 'admin123') {
      const admin = { id: 0, name: 'Admin', email, role: 'admin' };
      localStorage.setItem('fc_token', 'mock-token-admin');
      localStorage.setItem('fc_user', JSON.stringify(admin));
      return admin;
    }

    const users = readUsers();
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) {
      throw new Error('Invalid email or password.');
    }
    const { password: _pw, ...user } = match;
    localStorage.setItem('fc_token', `mock-token-${user.id}`);
    localStorage.setItem('fc_user', JSON.stringify(user));
    return user;
    // return (await api.post('/auth/login', payload)).data;
  },

  logout() {
    localStorage.removeItem('fc_token');
    localStorage.removeItem('fc_user');
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('fc_user'));
    } catch {
      return null;
    }
  },
};

export default authService;
