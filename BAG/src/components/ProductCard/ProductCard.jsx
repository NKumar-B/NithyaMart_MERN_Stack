import { useMemo } from "react";
import "./ProductCard.css";
import ImagePlaceholder from "../UI/ImagePlaceholder/ImagePlaceholder";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  badge,
  name,
  brand,
  rating,
  price,
  discount,
  image,
}) {
  const navigate = useNavigate();
  const { wishlist, cart, toggleWishlist, addToCart } = useShop();

  const item = useMemo(
    () =>
      product ?? {
        id: name + brand,
        badge,
        name,
        brand,
        rating,
        price,
        discount,
        image,
      },
    [product, badge, name, brand, rating, price, discount, image]
  );

  const inWishlist = wishlist.some((entry) => entry.id === item.id);
  const inCart = cart.some((entry) => entry.id === item.id);

  const handleWishlistToggle = () => {
    toggleWishlist(item);
  };

  const handleQuickView = () => {
    window.alert(`${item.name} by ${item.brand}\nPrice: ₹${item.price} - ${item.discount}% off\nA luxury pick for your collection.`);
  };

  return (
    <article className="product-card">

      <div className="product-image">

        <span className="product-badge">
          {item.badge}
        </span>

        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <ImagePlaceholder />
        )}

        <button
          type="button"
          className="wishlist-btn"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistToggle}
        >
          {inWishlist ? "♥" : "♡"}
        </button>

      </div>

      <div className="product-content">

        <p className="product-brand">
          {item.brand}
        </p>

        <h3 className="product-name">
          {item.name}
        </h3>

        <div className="product-rating">
          ⭐⭐⭐⭐⭐
          <span> ({item.rating})</span>
        </div>

        <div className="price-section">

          <span className="product-price">
            ₹{item.price}
          </span>

          <span className="product-discount">
            {item.discount}% OFF
          </span>

        </div>

        <div className="product-buttons">

          <button
            type="button"
            className="quick-view-btn"
            onClick={handleQuickView}
          >
            Quick View
          </button>

          <button
            type="button"
            className="cart-btn"
            onClick={() => addToCart(item)}
          >
            {inCart ? "Added" : "Add to Cart"}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;