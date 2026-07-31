import "./Hero.css";
import heroMain from "../../assets/products/hero-main.png";
import heroTop from "../../assets/products/hero-top.png";
import heroBottom from "../../assets/products/hero-bottom.png";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-tag">Luxury Crafted Collection</span>

          <h1>
            Discover Timeless Bags Designed For Every Journey
          </h1>

          <p>
            Explore handcrafted handbags, office bags, travel collections,
            premium wallets and accessories designed with elegance,
            sophistication and modern craftsmanship.
          </p>

          <div className="hero-buttons">
            <a href="#categories" className="outline-btn">
              Explore Collection
            </a>
          </div>

          <div className="hero-stats">
            <div><h3>500+</h3><p>Luxury Products</p></div>
            <div><h3>50K+</h3><p>Happy Customers</p></div>
            <div><h3>15+</h3><p>Years Craftsmanship</p></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            <img src={heroMain} alt="Main hero bag" />
          </div>

          <div className="floating-card top-card">
            <img src={heroTop} alt="Signature handbag" />
            <h4>Signature Handbag</h4>
            <span>Premium Collection</span>
          </div>

          <div className="floating-card bottom-card">
            <img src={heroBottom} alt="Travel collection" />
            <h4>Travel Collection</h4>
            <span>Luxury Edition</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
