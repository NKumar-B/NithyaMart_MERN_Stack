import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart, FiStar, FiArrowLeft, FiCheck } from 'react-icons/fi';
import foodService from '../services/foodService';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import Loader from '../components/Loader';
import './FoodDetails.css';

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    setQty(1);
    foodService.getFoodById(id).then((data) => {
      setFood(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader label="Plating up the details…" />;

  if (!food) {
    return (
      <div className="empty-state container">
        <h3>We couldn't find that item</h3>
        <p>It may have been removed from the menu.</p>
        <Link to="/menu" className="btn btn-primary">Back to Menu</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(food, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container section food-details">
      <button className="back-link" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className="details-grid">
        <div className="details-media">
          <img src={food.imageUrl} alt={food.name} className="details-img" />
          <span className={`badge ${food.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
            <span className={food.category === 'Veg' ? 'veg-dot' : 'nonveg-dot'} />
            {food.category}
          </span>
        </div>

        <div className="details-info">
          <h1>{food.name}</h1>
          <div className="details-rating">
            <FiStar /> {food.rating} <span>(230+ ratings)</span>
          </div>
          <p className="details-desc">{food.description}</p>

          <div className="details-ingredients">
            <h4>Ingredients</h4>
            <div className="ingredient-tags">
              {food.ingredients.map((ing) => (
                <span key={ing} className="ingredient-tag">{ing}</span>
              ))}
            </div>
          </div>

          <div className="details-price">{formatPrice(food.price)}</div>

          <div className="details-actions">
            <div className="qty-selector">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <FiMinus />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <FiPlus />
              </button>
            </div>

            <button className="btn btn-primary" onClick={handleAdd} disabled={!food.available}>
              {added ? <><FiCheck /> Added to Cart</> : <><FiShoppingCart /> Add to Cart · {formatPrice(food.price * qty)}</>}
            </button>
          </div>

          {!food.available && <p className="unavailable-note">This item is currently sold out.</p>}
        </div>
      </div>
    </div>
  );
}
