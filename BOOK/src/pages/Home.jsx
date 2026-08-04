import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { useBookStore } from "../context/BookStoreContext";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import { useState } from "react";
import "./Home.css";

function Home() {
  const { books, wishlist } = useBookStore();
  const [selectedBook, setSelectedBook] = useState(null);

  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const fiction = books.filter(b => b.category === "Fiction").slice(0, 4);
  const finance = books.filter(b => b.category === "Finance").slice(0, 4);
  const wishlistCount = wishlist.length;

  const sections = [
    { title: "⭐ Top Rated Books", books: topRated, id: "top-rated" },
    { title: "📖 Popular Fiction", books: fiction, id: "fiction" },
    { title: "💰 Finance Bestsellers", books: finance, id: "finance" }
  ];

  return (
    <div className="home-page">
      <Banner />

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h3>Free Delivery</h3>
            <p>On all orders above ₹500</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Easy Returns</h3>
            <p>7-day return guarantee</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3>24/7 Support</h3>
            <p>Always here to help</p>
          </div>
        </div>
      </section>

      {sections.map(section => (
        <section key={section.id} className="books-section">
          <div className="section-header">
            <h2>{section.title}</h2>
            <Link to="/books" className="view-all-link">
              View All →
            </Link>
          </div>
          <div className="books-grid">
            {section.books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={setSelectedBook}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="cta-section">
        <div className="cta-content">
          <div>
            <span className="cta-subtitle">🎁 Special Offer</span>
            <h2>Use WELCOME10 for 10% OFF Your First Order</h2>
            <p>
              {wishlistCount > 0
                ? `You have ${wishlistCount} book${wishlistCount > 1 ? "s" : ""} in your wishlist — time to bring them home!`
                : "Start your reading journey today with our handpicked selection of bestsellers."}
            </p>
          </div>
          <Link to="/books" className="btn btn-primary cta-btn">
            Shop Now 🛍️
          </Link>
        </div>
      </section>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default Home;
