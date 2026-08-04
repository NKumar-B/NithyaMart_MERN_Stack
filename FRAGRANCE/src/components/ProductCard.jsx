function resolveImagePath(path) {
  if (!path) return "";
  if (window.location.pathname.includes("/FRAGRANCE/")) {
    return `/FRAGRANCE/public${path}`;
  }
  return path;
}

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={resolveImagePath(product.image)} alt={product.name} />

      <h3>{product.name}</h3>

      <p>{product.brand}</p>

      <h4>{product.price}</h4>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;