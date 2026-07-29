import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";
import "../styles/ProductGrid.css";
const ProductGrid = () => {
  const { addToCart } = useContext(CartContext);

  return (
   <section className="products" id="products">
      <h2 className="products-title">Premium Chocolates</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.brand}</p>

            <h2>₹{product.price}</h2>

            <p>⭐ {product.rating}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;