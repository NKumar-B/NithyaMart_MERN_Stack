import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <span className="nf-icon">📚</span>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">
        ← Back to Home
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">📚</span>
          <div>
            <strong>BookHaven</strong>
            <p>Your gateway to great stories</p>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <a href="/books">All Books</a>
            <a href="/books">Fiction</a>
            <a href="/books">Self Help</a>
            <a href="/books">Finance</a>
          </div>
          <div>
            <h4>Help</h4>
            <a href="#">Contact Us</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">FAQ</a>
          </div>
          <div>
            <h4>Follow Us</h4>
            <a href="#">📘 Facebook</a>
            <a href="#">🐦 Twitter</a>
            <a href="#">📷 Instagram</a>
            <a href="#">💼 LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} BookHaven · Built with ❤️ using React
      </div>
    </footer>
  );
}

export default App;
