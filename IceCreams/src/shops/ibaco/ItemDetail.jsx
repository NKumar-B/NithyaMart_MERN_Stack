import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from './ibaco.api';
import sampleItems from './sampleData';
import { useCart } from './CartContext';
import MiniCartBar from './MiniCartBar';
import './ibaco.css';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItemById(id);
        setItem(res.data);
      } catch (err) {
        console.warn('Using sample data (backend not reachable):', err.message);
        setItem(sampleItems.find((i) => i._id === id));
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="ibaco-item-detail-wrap">
      <MiniCartBar />
      <div className="ibaco-item-detail">
      <img src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'; }} />
      <div className="ibaco-item-info">
        <h2>{item.name}</h2>
        <p className="ibaco-size">{item.size}</p>
        <p>{item.description}</p>
        <p className="ibaco-price">₹{item.price}</p>
        <p>Rating: {item.rating} ★</p>
        <p>{item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</p>
        <button
          className="ibaco-btn"
          disabled={!item.inStock}
          onClick={() => addToCart(item)}
        >
          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
      </div>
    </div>
  );
};

export default ItemDetail;
