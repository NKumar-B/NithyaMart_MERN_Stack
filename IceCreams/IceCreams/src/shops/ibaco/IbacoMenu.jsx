import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getItems } from './ibaco.api';
import sampleItems from './sampleData';
import { useCart } from './CartContext';
import MiniCartBar from './MiniCartBar';
import './ibaco.css';

const CATEGORIES = ['all', 'tub', 'scoop', 'sundae', 'cone', 'bar', 'shake', 'cake', 'combo'];

const IbacoMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const category = activeCategory === 'all' ? undefined : activeCategory;
        const res = await getItems(category);
        setItems(res.data);
      } catch (err) {
        // Backend not connected yet — fall back to sample data
        console.warn('Using sample data (backend not reachable):', err.message);
        const filtered =
          activeCategory === 'all'
            ? sampleItems
            : sampleItems.filter((i) => i.category === activeCategory);
        setItems(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeCategory]);

  return (
    <div className="ibaco-menu">
      <MiniCartBar />
      <h2>Ibaco Menu</h2>

      <div className="ibaco-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`ibaco-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setSearchParams(cat === 'all' ? {} : { category: cat })}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className="ibaco-grid">
          {items.map((item) => (
            <div className="ibaco-card" key={item._id}>
              <Link to={`/shops/ibaco/item/${item._id}`}>
                <img src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/e2e8f0/64748b?text=No+Image'; }} />
                <h3>{item.name}</h3>
              </Link>
              <p className="ibaco-size">{item.size}</p>
              <p className="ibaco-price">₹{item.price}</p>
              <button
                className="ibaco-btn small"
                disabled={!item.inStock}
                onClick={() => addToCart(item)}
              >
                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IbacoMenu;
