import React from 'react';
import { Flame, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

export default function HeroBanner({ onSelectGender, onSelectCategory, onExploreClick }) {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-tag">
          <Flame size={16} /> Authentic Sports Wear & Gear Store
        </div>
        <h1 className="hero-title">
          Performance Sports Wear & Training Accessories
        </h1>
        <p className="hero-subtitle">
          Gear up with authentic Dri-FIT t-shirts, competition jerseys, compression wear, resistance bands, sweatbands, gym gloves, shuttlecocks, and tennis balls from top global sports brands.
        </p>

        <div className="hero-cta-group">
          <button className="cta-btn" onClick={() => onSelectGender('Men')}>
            Men's Sports Wear <ArrowRight size={18} />
          </button>
          <button className="cta-btn cta-btn-outline" onClick={() => onSelectGender('Women')}>
            Women's Sports Wear
          </button>
          <button className="cta-btn cta-btn-outline" onClick={() => onSelectCategory('Sports Accessories')}>
            Sports Accessories
          </button>
        </div>
      </div>

      {/* Brand Grid */}
      <div className="brand-bar">
        <span className="brand-item">NIKE DRI-FIT</span>
        <span className="brand-item">ADIDAS AEROREADY</span>
        <span className="brand-item">PUMA ULTRA</span>
        <span className="brand-item">UNDER ARMOUR</span>
        <span className="brand-item">YONEX</span>
        <span className="brand-item">WILSON</span>
        <span className="brand-item">HARBINGER</span>
        <span className="brand-item">MCDAVID</span>
      </div>
    </section>
  );
}