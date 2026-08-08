import { useState } from "react";

function resolveImagePath(path) {
  if (!path) return "";
  if (path.startsWith("/")) {
    return `.${path}`;
  }
  return path;
}

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card">
      <img src={resolveImagePath(product.image)} alt={product.name} />

      <h3>{product.name}</h3>

      <p>{product.brand}</p>

      <h4>{product.price}</h4>

      <button className={added ? "added-btn" : ""} onClick={handleAdd}>
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;