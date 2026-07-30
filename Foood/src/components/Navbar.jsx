import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/veg', label: 'Veg' },
  { to: '/non-veg', label: 'Non-Veg' },
  { to: '/orders', label: 'Orders' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand" onClick={close}>
          <span className="brand-mark">🍔</span>
          <span className="brand-text">
            Bite<span>Court</span>
          </span>
        </NavLink>

        <nav className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={close}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="nav-mobile-actions">
            {user ? (
              <button className="nav-link" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            ) : (
              <NavLink to="/login" className="nav-link" onClick={close}>
                <FiUser /> Login
              </NavLink>
            )}
          </div>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/cart" className="cart-btn" aria-label="View cart" onClick={close}>
            <FiShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>

          {user ? (
            <button className="btn btn-outline btn-sm auth-btn" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm auth-btn">
              <FiUser /> Login
            </NavLink>
          )}

          <button className="menu-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
