import { Link } from "react-router-dom";
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle";
import { useShop } from "../../context/ShopContext";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist } = useShop();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <main className="wishlist-page">
      <div className="container">
        <SectionTitle subtitle="Saved Picks" title="Your Wishlist" />

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <p>Your wishlist is empty. Tap the heart icon on a product to save it.</p>
            <Link to="/" className="wishlist-back-link">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <article className="wishlist-card" key={item.id}>
                {item.image && (
                  <div className="wishlist-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                )}
                <div className="wishlist-details">
                  <p className="wishlist-badge">{item.badge}</p>
                  <h3>{item.name}</h3>
                  <p className="wishlist-brand">{item.brand}</p>
                  <div className="wishlist-meta">
                    <span>${item.price}</span>
                    <small>{item.discount}% OFF</small>
                  </div>
                  <div className="wishlist-actions">
                    <button
                      type="button"
                      className="wishlist-add-btn"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
