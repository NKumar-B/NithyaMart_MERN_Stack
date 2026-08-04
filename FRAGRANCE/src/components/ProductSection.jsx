import ProductCard from "./ProductCard";

function ProductSection({ id, title, products, onAddToCart }) {
  return (
    <section id={id}>
      <h2>{title}</h2>

      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;