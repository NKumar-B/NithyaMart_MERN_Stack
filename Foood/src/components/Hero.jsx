import HeroContent from './HeroContent';
import FoodCarousel from './FoodCarousel';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <HeroContent />
        <div className="hero-art-col">
          <FoodCarousel />
        </div>
      </div>
    </section>
  );
}

