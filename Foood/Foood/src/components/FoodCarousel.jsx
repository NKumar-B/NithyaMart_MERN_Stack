import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import foodsData from '../data/foods.json';
import './Hero.css';

const RING_COUNT = 8;

/** Pre-select 9 photogenic foods for the carousel (1 center + 8 ring) */
function getCarouselFoods() {
  const ids = [1, 4, 6, 18, 8, 11, 16, 10, 2];
  const result = [];
  for (const id of ids) {
    const food = foodsData.find((f) => f.id === id);
    if (food) result.push(food);
  }
  return result;
}

/** Compute (x, y) for a ring position */
function ringPosition(index, total, radius) {
  const angle = ((index - 1) / total) * 360 - 90; // start at top
  const rad = (angle * Math.PI) / 180;
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad),
  };
}

export default function FoodCarousel() {
  const allFoods = useMemo(() => getCarouselFoods(), []);

  // items[0] = center, items[1..8] = ring positions (clockwise from top)
  const [items, setItems] = useState(() => allFoods.slice(0, 9));

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        // Top ring item → new center, rest shift clockwise, old center → last ring
        const newCenter = prev[1];
        const newRing = [...prev.slice(2), prev[0]];
        return [newCenter, ...newRing];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const centerFood = items[0];

  return (
    <div className="carousel-wrapper">
      {/* Floating background glow */}
      <div className="carousel-bg-glow" />

      {/* Subtle floating particles */}
      <div className="carousel-particles">
        {['🍔', '🍕', '🍟', '🌯', '🧀', '🍗'].map((emoji, i) => (
          <span key={i} className="particle" style={{ '--i': i }}>
            {emoji}
          </span>
        ))}
      </div>

      {/* Orbiting ring */}
      <div className="carousel-ring">
        {items.map((food, index) => {
          const isCenter = index === 0;
          const pos = isCenter
            ? { x: 0, y: 0 }
            : ringPosition(index, RING_COUNT, 210);
          const size = isCenter ? 128 : 64;

          return (
            <motion.div
              key={`pos-${index}`}
              layout
              transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.8 }}
              className={`carousel-item ${isCenter ? 'carousel-item-center' : ''}`}
              style={{ width: size, height: size }}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: isCenter ? 1 : 0.9,
                opacity: 1,
              }}
            >
              <img
                src={food.imageUrl}
                alt={food.name}
                className="carousel-food-img"
                style={{
                  borderRadius: '50%',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {!isCenter && <span className="carousel-label">{food.name.split(' ')[0]}</span>}
            </motion.div>
          );
        })}
      </div>

      {/* Center label */}
      {centerFood && (
        <motion.div
          className="carousel-center-label"
          key={centerFood.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {centerFood.name}
        </motion.div>
      )}

      {/* Glassmorphism ring border */}
      <div className="carousel-ring-border" />
    </div>
  );
}

