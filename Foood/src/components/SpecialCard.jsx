import { motion } from 'framer-motion';
import './Hero.css';

export default function SpecialCard({ name, image, price, index }) {
  return (
    <motion.div
      className="special-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div className="special-img-wrap">
        <img src={image} alt={name} />
      </div>
      <div>
        <strong>{name}</strong>
        {price && <span className="special-price">₹{price}</span>}
      </div>
    </motion.div>
  );
}

