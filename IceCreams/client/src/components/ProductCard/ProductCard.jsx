import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import './ProductCard.css'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80',
  'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=600&q=80',
  'https://images.unsplash.com/photo-1488900128323-21503983257e?w=600&q=80',
  'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80',
  'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600&q=80',
  'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&q=80',
  'https://images.unsplash.com/photo-1576506295286-5cda482453a2?w=600&q=80',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?w=600&q=80',
  'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=600&q=80',
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80',
  'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80'
]

function getFallbackImage(product) {
  if (!product) return FALLBACK_IMAGES[0];
  const key = String(product._id || product.id || product.name || '');
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return FALLBACK_IMAGES[Math.abs(hash) % FALLBACK_IMAGES.length];
}

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { addToCart } = useCart()
  const [quickView, setQuickView] = useState(false)
  const wished = isWishlisted(product._id || product.id)

  const fallback = getFallbackImage(product)
  const imgSrc = product.image && product.image.startsWith('http') ? product.image : fallback

  return (
    <>
      <div className="product-card card">
        <div className="product-media">
          <img 
            src={imgSrc} 
            alt={product.name} 
            loading="lazy" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallback;
            }}
          />
          {product.serves && <span className="badge badge-gold product-serves">{product.serves}</span>}
          <button
            className={`product-fav ${wished ? 'active' : ''}`}
            aria-label="Toggle wishlist"
            onClick={() => toggleWishlist(product)}
          >
            <FiHeart />
          </button>
          <button className="product-quick" onClick={() => setQuickView(true)}>
            <FiEye /> View Details
          </button>
        </div>

        <div className="product-body">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-desc">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">₹{product.price}<sup>*</sup></span>
            <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
              <FiShoppingCart /> Add
            </button>
          </div>
        </div>
      </div>

      {quickView && (
        <div className="quickview-overlay" onClick={() => setQuickView(false)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <img 
              src={imgSrc} 
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallback;
              }}
            />
            <div className="quickview-body">
              <span className="product-category-tag">{product.category}{product.serves ? ` · ${product.serves}` : ''}</span>
              <h3>{product.name}</h3>
              <p className="quickview-desc">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">₹{product.price}<sup>*</sup></span>
                <button className="btn btn-primary" onClick={() => { addToCart(product); setQuickView(false) }}>
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
