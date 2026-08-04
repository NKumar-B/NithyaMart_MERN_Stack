import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import { useBookStore } from "../context/BookStoreContext";
import "./Books.css";

function Books() {
  const { books } = useBookStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBook, setSelectedBook] = useState(null);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(books.map((b) => b.category))];
    return cats;
  }, [books]);

  const filteredAndSorted = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower)
      );
    }

    if (category !== "All") {
      result = result.filter((book) => book.category === category);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "featured":
      default:
        result.sort((a, b) => b.rating * b.price - a.rating * a.price);
    }

    return result;
  }, [books, search, category, sortBy]);

  return (
    <div className="books-page">
      <div className="page-header">
        <div className="page-header-inner">
          <span className="page-breadcrumb">🏠 Home / Books</span>
          <h1 className="page-title">📚 Browse All Books</h1>
          <p className="page-description">
            Discover {books.length} amazing books across {categories.length - 1}{" "}
            categories
          </p>
        </div>
      </div>

      <div className="books-container">
        <div style={{ margin: "0 auto 24px" }}>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="filters-bar">
          <Category categories={categories} category={category} setCategory={setCategory} />
          <div className="sort-wrapper">
            <label className="sort-label" htmlFor="sort-select">
              Sort by:
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">✨ Featured</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💰 Price: High to Low</option>
              <option value="rating">⭐ Top Rated</option>
              <option value="name-asc">🔤 A → Z</option>
              <option value="name-desc">🔤 Z → A</option>
            </select>
          </div>
        </div>

        <div className="results-bar">
          <span className="results-count">
            Showing <strong>{filteredAndSorted.length}</strong> book
            {filteredAndSorted.length !== 1 && "s"}
            {category !== "All" && <> in <strong>{category}</strong></>}
            {search && <> matching "<strong>{search}</strong>"</>}
          </span>
          {search && (
            <button className="clear-filters-btn" onClick={() => setSearch("")}>
              Clear search ✕
            </button>
          )}
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No books found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="books-grid">
            {filteredAndSorted.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={setSelectedBook}
              />
            ))}
          </div>
        )}
      </div>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default Books;
