import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';

export function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  return (
    <div className="product-card">
      <div className="card-image-wrap" onClick={() => onSelectProduct(product)}>
        <img src={product.image} alt={product.name} className="card-img" />

        <span className="card-category-badge">
          {product.category}
        </span>

        <button
          className={`wishlist-icon-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'white' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-brand">{product.brand}</div>
        <h3 className="card-title" onClick={() => onSelectProduct(product)}>
          {product.name}
        </h3>

        <div className="card-rating">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating}</span>
          <span style={{ color: '#64748b', fontWeight: 500 }}>({product.reviewCount})</span>
        </div>

        <div className="card-price-row">
          <div className="price-box">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button className="add-btn" onClick={() => onAddToCart(product, product.sizes?.[0] || 'Standard')}>
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b', fontWeight: 600 }}>
        Loading sports collection...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>No products found</h3>
        <p style={{ color: '#64748b' }}>Try adjusting your search criteria or price filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          isWishlisted={wishlistIds.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}