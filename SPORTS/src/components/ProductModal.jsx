import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem' }}>
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
              }}
            />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase' }}>
                {product.brand} • {product.category}
              </span>
              <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0.2rem 0' }}>{product.name}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 700 }}>
                <Star size={16} fill="#f59e0b" />
                <span>{product.rating}</span>
                <span style={{ color: '#64748b', fontWeight: 500 }}>({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
              {product.description}
            </p>

            {/* Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Select Option / Size:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`cat-tab ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      style={{ padding: '0.4rem 0.9rem' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            {product.features && (
              <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>
                  Key Features:
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={14} color="#10b981" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button className="btn-block" style={{ marginTop: '0.5rem' }} onClick={handleAdd}>
              <ShoppingBag size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Add to Shopping Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}