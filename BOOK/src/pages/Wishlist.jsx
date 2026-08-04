import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../context/BookStoreContext";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, addToCart, toggleWishlist, cartCount } = useBookStore();
  const [selectedBook, setSelectedBook] = useState(null);

  const totalPrice = wishlist.reduce((sum, book) => sum + book.price, 0);
  const totalSavings = wishlist.reduce(
    (sum, book) => sum + (book.originalPrice - book.price),
    0
  );

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <div className="page-header-inner">
          <span className="page-breadcrumb">🏠 Home / Wishlist</span>
          <h1 className="page-title">❤️ My Wishlist</h1>
          <p className="page-description">
            {wishlist.length === 0
              ? "Save books you love for later"
              : `You have ${wishlist.length} saved book${wishlist.length > 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <span className="empty-wishlist-icon">💝</span>
            <h2>Your wishlist is empty</h2>
            <p>Click the heart icon on any book to save it here for later.</p>
            <Link to="/books" className="btn btn-primary">
              Explore Books →
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-summary">
              <div className="summary-card">
                <span className="summary-label">Books Saved</span>
                <span className="summary-value">{wishlist.length}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Total Price</span>
                <span className="summary-value">₹{totalPrice}</span>
              </div>
              <div className="summary-card savings">
                <span className="summary-label">Total Savings</span>
                <span className="summary-value">₹{totalSavings}</span>
              </div>
              <div className="summary-card cart-info">
                <span className="summary-label">In Cart</span>
                <span className="summary-value">{cartCount} items</span>
              </div>
            </div>

            <div className="wishlist-actions-bar">
              <h2>Saved Books</h2>
              {wishlist.length > 0 && (
                <Link to="/cart" className="btn btn-primary view-cart-btn">
                  🛒 View Cart
                </Link>
              )}
            </div>

            <div className="wishlist-books-grid">
              {wishlist.map((book) => (
                <div key={book.id} className="wishlist-book-wrapper">
                  <BookCard book={book} onViewDetails={setSelectedBook} />
                  <div className="wishlist-book-extra-actions">
                    <button
                      className="add-all-btn"
                      onClick={() => {
                        addToCart(book);
                        toggleWishlist(book);
                      }}
                    >
                      ➕ Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default Wishlist;
