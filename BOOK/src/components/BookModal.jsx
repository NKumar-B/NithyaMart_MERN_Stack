import { useEffect } from "react";
import { useBookStore } from "../context/BookStoreContext";
import "./BookModal.css";

function BookModal({ book, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart, cart } = useBookStore();

  useEffect(() => {
    if (book) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [book]);

  if (!book) return null;

  const inWishlist = isInWishlist(book.id);
  const inCart = isInCart(book.id);
  const cartItem = cart.find((item) => item.id === book.id);
  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-grid">
          <div className="modal-image-section">
            {discount > 0 && (
              <div className="modal-discount-badge">-{discount}% OFF</div>
            )}
            <img src={book.image} alt={book.title} className="modal-image" />
          </div>

          <div className="modal-content-section">
            <span className="modal-category-tag">{book.category}</span>
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">
              by <strong>{book.author}</strong>
            </p>

            <div className="modal-meta">
              <div className="meta-item">
                <span className="meta-label">📅 Published</span>
                <span className="meta-value">{book.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">📄 Pages</span>
                <span className="meta-value">{book.pages}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">🏢 Publisher</span>
                <span className="meta-value">{book.publisher}</span>
              </div>
            </div>

            <div className="modal-rating-row">
              <div className="modal-rating">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`modal-star ${
                      i <= Math.round(book.rating) ? "filled" : "empty"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="modal-rating-score">
                {book.rating} / 5 average rating
              </span>
            </div>

            <p className="modal-description">{book.description}</p>

            <div className="modal-pricing">
              <span className="modal-current-price">₹{book.price}</span>
              {book.originalPrice > book.price && (
                <>
                  <span className="modal-original-price">₹{book.originalPrice}</span>
                  <span className="modal-savings">
                    Save ₹{book.originalPrice - book.price}
                  </span>
                </>
              )}
            </div>

            <div className="modal-actions">
              <button
                className={`modal-btn-wishlist ${inWishlist ? "active" : ""}`}
                onClick={() => toggleWishlist(book)}
              >
                {inWishlist ? "❤️ Added to Wishlist" : "🤍 Add to Wishlist"}
              </button>

              {inCart ? (
                <button className="modal-btn-cart added" disabled>
                  ✔️ In Cart ({cartItem?.quantity})
                </button>
              ) : (
                <button
                  className="modal-btn-cart"
                  onClick={() => addToCart(book)}
                >
                  🛒 Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
