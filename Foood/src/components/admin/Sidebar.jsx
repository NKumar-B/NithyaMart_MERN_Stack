import { NavLink, Link } from 'react-router-dom';
import { FiGrid, FiList, FiPlusSquare, FiClipboard, FiArrowLeft } from 'react-icons/fi';
import './Sidebar.css';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/admin/foods', label: 'Manage Foods', icon: <FiList /> },
  { to: '/admin/foods/add', label: 'Add Food', icon: <FiPlusSquare /> },
  { to: '/admin/orders', label: 'Manage Orders', icon: <FiClipboard /> },
];

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span>🍔</span> Bite<span>Court</span>
        <small>Admin</small>
      </div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin/foods'}
            className={({ isActive }) => `admin-link ${isActive ? 'admin-link-active' : ''}`}
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </nav>
      <Link to="/" className="admin-back">
        <FiArrowLeft /> Back to site
      </Link>
    </aside>
  );
}
