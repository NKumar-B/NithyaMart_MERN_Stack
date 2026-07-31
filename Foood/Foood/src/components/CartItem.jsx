import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-media"><img src={item.imageUrl} alt={item.name} className="cart-item-img" loading="lazy" /></div>
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <span className={`badge ${item.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
          <span className={item.category === 'Veg' ? 'veg-dot' : 'nonveg-dot'} />
          {item.category}
        </span>
        <span className="cart-item-price">{formatPrice(item.price)} each</span>
      </div>

      <div className="cart-item-qty">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease quantity">
          <FiMinus />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
          <FiPlus />
        </button>
      </div>

      <div className="cart-item-total">{formatPrice(item.price * item.quantity)}</div>

      <button className="cart-item-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
        <FiTrash2 />
      </button>
    </div>
  );
}
