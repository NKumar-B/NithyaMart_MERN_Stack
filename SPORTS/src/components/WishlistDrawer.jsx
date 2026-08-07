import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 style={{ fontSize: '1.2rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} color="#f43f5e" fill="#f43f5e" />
            My Wishlist ({wishlistItems.length})
          </h2>
          <button className="close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', color: '#94a3b8' }}>
              <Heart size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No sports items saved in wishlist yet.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-meta">{item.brand} • {item.category}</div>
                  <div style={{ fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
                    ${item.price.toFixed(2)}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      className="add-btn"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => onAddToCart(item, item.sizes?.[0] || 'M')}
                    >
                      <ShoppingBag size={12} /> Add to Cart
                    </button>
                    <button
                      className="qty-btn"
                      style={{ color: '#f43f5e' }}
                      onClick={() => onRemoveFromWishlist(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}