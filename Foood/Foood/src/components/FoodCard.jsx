import { Link } from 'react-router-dom';
import { FiStar, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './FoodCard.css';

export default function FoodCard({ food }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(food, 1);
  };

  return (
    <Link to={`/food/${food.id}`} className="food-card fade-up">
      <div className="food-card-media">
        <img src={food.imageUrl} alt={food.name} className="food-img" loading="lazy" />
        <span className={`badge ${food.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
          <span className={food.category === 'Veg' ? 'veg-dot' : 'nonveg-dot'} />
          {food.category}
        </span>
        {!food.available && <span className="sold-out">Sold Out</span>}
      </div>
      <div className="food-card-body">
        <div className="food-card-top">
          <h3>{food.name}</h3>
          <span className="food-rating"><FiStar /> {food.rating}</span>
        </div>
        <p className="food-card-desc">{food.description}</p>
        <div className="food-card-bottom">
          <span className="food-price">{formatPrice(food.price)}</span>
          <button className="add-btn" onClick={handleAdd} disabled={!food.available} aria-label="Add to cart">
            <FiPlus /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}
