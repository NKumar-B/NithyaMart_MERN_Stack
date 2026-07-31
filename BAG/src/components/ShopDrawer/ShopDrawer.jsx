import "./ShopDrawer.css";

function ShopDrawer({ type, items, count, onClose }) {
  if (!type) {
    return null;
  }

  const title = type === "wishlist" ? "Wishlist" : "Cart";
  const emptyText =
    type === "wishlist"
      ? "Your wishlist is empty. Tap the heart icon on a product to save it."
      : "Your cart is empty. Use Add to Cart on a product to add it here.";

  return (
    <aside className="shop-drawer">
      <div className="drawer-header">
        <div>
          <p className="drawer-label">{title}</p>
          <h2>{count} item{count === 1 ? "" : "s"}</h2>
        </div>
        <button
          type="button"
          className="drawer-close"
          aria-label="Close drawer"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="drawer-body">
        {items.length > 0 ? (
          items.map((item) => (
            <article className="drawer-item" key={item.id}>
              {item.image && (
                <div className="item-thumbnail">
                  <img src={item.image} alt={item.name} />
                </div>
              )}
              <div className="item-meta">
                <p className="item-badge">{item.badge}</p>
                <h3>{item.name}</h3>
                <p className="item-brand">{item.brand}</p>
              </div>
              <div className="item-price">
                <span>${item.price}</span>
                <small>{item.discount}% OFF</small>
              </div>
            </article>
          ))
        ) : (
          <p className="drawer-empty">{emptyText}</p>
        )}
      </div>
    </aside>
  );
}

export default ShopDrawer;
