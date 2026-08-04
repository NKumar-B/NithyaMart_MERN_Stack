function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>{product.brand}</p>

      <h4>{product.price}</h4>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;