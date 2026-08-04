import { NavLink } from "react-router-dom";
import { useBookStore } from "../context/BookStoreContext";
import "./Navbar.css";

function Navbar() {
  const { cartCount, wishlist } = useBookStore();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">BookHaven</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              🏠 Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              📖 Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              ❤️ Wishlist
              {wishlist.length > 0 && (
                <span className="badge wishlist-badge">{wishlist.length}</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="badge cart-badge">{cartCount}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
