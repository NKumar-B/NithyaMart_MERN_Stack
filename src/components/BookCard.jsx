import { useBookStore } from "../context/BookStoreContext";
import "./BookCard.css";

function BookCard({ book, onViewDetails }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart, cart } = useBookStore();

  const inWishlist = isInWishlist(book.id);
  const inCart = isInCart(book.id);
  const cartItem = cart.find(item => item.id === book.id);

  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    if (hasHalf) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    return stars;
  };

  return (
    <div className="book-card">
      {discount > 0 && (
        <div className="discount-badge">-{discount}%</div>
      )}

      <button
        className={`wishlist-btn ${inWishlist ? "active" : ""}`}
        onClick={() => toggleWishlist(book)}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      <div className="book-image-wrapper" onClick={() => onViewDetails && onViewDetails(book)}>
        <img src={book.image} alt={book.title} className="book-image" loading="lazy" />
        <div className="book-overlay">
          <span className="quick-view">👁️ Quick View</span>
        </div>
      </div>

      <div className="book-info">
        <span className="book-category">{book.category}</span>
        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <p className="book-author">by {book.author}</p>

        <div className="book-rating">
          <div className="stars">{renderStars(book.rating)}</div>
          <span className="rating-text">({book.rating})</span>
        </div>

        <div className="book-pricing">
          <span className="current-price">₹{book.price}</span>
          {book.originalPrice > book.price && (
            <span className="original-price">₹{book.originalPrice}</span>
          )}
        </div>

        <div className="card-actions">
          {inCart ? (
            <button className="btn-add added" disabled>
              ✔️ In Cart ({cartItem?.quantity})
            </button>
          ) : (
            <button className="btn-add" onClick={() => addToCart(book)}>
              🛒 Add to Cart
            </button>
          )}
          {onViewDetails && (
            <button className="btn-details" onClick={() => onViewDetails(book)}>
              ℹ️ Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
