import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <h2>🍫 ChocoLux</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#products">Products</a>
        </li>

        <li>
          <Link to="/cart">
            Cart ({cartItems.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;