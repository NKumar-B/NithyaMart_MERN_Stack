import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import StatsCard from './StatsCard';
import TrustBadge from './TrustBadge';
import SpecialCard from './SpecialCard';
import foodsData from '../data/foods.json';
import './Hero.css';

const stats = [
  { icon: '⭐', label: 'Rating', value: '4.8' },
  { icon: '⚡', label: 'Pickup', value: '10-15 min' },
  { icon: '🍴', label: 'Dishes', value: '250+' },
  { icon: '🏪', label: 'Kitchens', value: '6' },
];

const trustItems = [
  'Fresh Ingredients',
  'Hygienic Kitchen',
  'Live Order Tracking',
  'Fast Pickup',
];

const specials = [
  { id: 1, name: 'Veg Burger', price: 99 },
  { id: 3, name: 'Veg Pizza', price: 189 },
  { id: 12, name: 'Chicken Pizza', price: 229 },
  { id: 6, name: 'French Fries', price: 79 },
];

export default function HeroContent() {
  const specialFoods = specials
    .map((s) => {
      const food = foodsData.find((f) => f.id === s.id);
      return food ? { ...food, price: s.price } : null;
    })
    .filter(Boolean);

  return (
    <div className="hero-content">
      {/* Heading */}
      <motion.h1
        className="hero-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Fresh Food,
        <br />
        <span className="hero-highlight">One Counter</span>,
        <br />
        Endless Cravings.
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      >
        Experience delicious meals from 6 different kitchens with one simple order.
        Burgers, Pizza, Shawarma, Fries, Ice Cream, Chinese, and much more —
        freshly prepared while you shop.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
      >
        <Link to="/menu" className="btn btn-primary btn-lg">
          🍔 Explore Menu <FiArrowRight />
        </Link>
        <Link to="/menu" className="btn btn-outline btn-lg">
          🛒 Order Now
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      >
        {stats.map((s) => (
          <StatsCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </motion.div>

      {/* Trust badges */}
      <motion.div
        className="trust-badges"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        {trustItems.map((item) => (
          <TrustBadge key={item}>{item}</TrustBadge>
        ))}
      </motion.div>

      {/* Customer social proof */}
      <motion.div
        className="hero-social-proof"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
      >
        <div className="customer-avatars">
          {['https://i.pravatar.cc/40?img=1', 'https://i.pravatar.cc/40?img=5', 'https://i.pravatar.cc/40?img=8', 'https://i.pravatar.cc/40?img=11'].map(
            (src, i) => (
              <img key={i} src={src} alt="" className="avatar" />
            ),
          )}
          <span className="avatar-more">+2k</span>
        </div>
        <div className="proof-text">
          <div className="proof-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} size={14} fill="var(--color-primary)" stroke="var(--color-primary)" />
            ))}
          </div>
          <span className="proof-label">5,000+ Happy Customers</span>
        </div>
      </motion.div>

      {/* Today's Special */}
      <motion.div
        className="today-specials"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      >
        <span className="specials-eyebrow">🔥 Today's Special</span>
        <div className="specials-grid">
          {specialFoods.map((food, i) => (
            <SpecialCard
              key={food.id}
              name={food.name}
              image={food.imageUrl}
              price={food.price}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

