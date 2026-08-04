import { Link } from "react-router-dom";
import "./Banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-overlay" />
      <div className="banner-content">
        <span className="banner-subtitle">✨ Welcome to the world of stories</span>
        <h1>Discover Your Next <span className="accent-text">Great Read</span></h1>
        <p>
          Explore thousands of books across all genres. From timeless classics to
          contemporary bestsellers — your perfect book is just a click away.
        </p>
        <div className="banner-buttons">
          <Link to="/books" className="btn btn-primary">
            📚 Browse All Books
          </Link>
          <Link to="/books?category=Fiction" className="btn btn-secondary">
            🌟 Popular Fiction
          </Link>
        </div>
        <div className="banner-stats">
          <div className="stat-item">
            <span className="stat-number">12+</span>
            <span className="stat-label">Books Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
