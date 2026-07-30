import { Link } from "react-router-dom";
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle";
import { useShop } from "../../context/ShopContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, toggleWishlist, wishlist } = useShop();

  const isWishlisted = (itemId) =>
    wishlist.some((item) => item.id === itemId);

  return (
    <main className="cart-page">
      <div className="container">
        <SectionTitle subtitle="Your selections" title="Shopping Cart" />

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty. Add a premium bag to get started.</p>
            <Link to="/" className="cart-back-link">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            {cart.map((item) => (
              <article className="cart-card" key={item.id}>
                {item.image && (
                  <div className="cart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                )}
                <div className="cart-details">
                  <p className="cart-badge">{item.badge}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-brand">{item.brand}</p>
                  <div className="cart-meta">
                    <span>${item.price}</span>
                    <small>{item.discount}% OFF</small>
                  </div>
                  <div className="cart-actions">
                    <button
                      type="button"
                      className="cart-wishlist-btn"
                      onClick={() => toggleWishlist(item)}
                    >
                      {isWishlisted(item.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </button>
                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
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

export default Cart;
