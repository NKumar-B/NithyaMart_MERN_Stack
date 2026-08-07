import React from 'react';
import { SlidersHorizontal, User, Tag } from 'lucide-react';

export default function ProductFilter({
  categories,
  brands,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  sortBy,
  setSortBy,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="filters-bar" id="products-section">
      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="filter-controls">
        {/* Gender Selector */}
        <div className="filter-group">
          <User size={16} color="#0f172a" />
          <span className="filter-label">Gender:</span>
          <select
            className="select-input"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="All">All Genders</option>
            <option value="Men">Men's Wear</option>
            <option value="Women">Women's Wear</option>
            <option value="Unisex">Unisex / Accessories</option>
          </select>
        </div>

        {/* Brand Selector */}
        <div className="filter-group">
          <Tag size={16} color="#94a3b8" />
          <span className="filter-label">Brand:</span>
          <select
            className="select-input"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Range Slider */}
        <div className="filter-group">
          <span className="filter-label">Max Price: ${maxPrice}</span>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ accentColor: '#0f172a', cursor: 'pointer' }}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="filter-group">
          <SlidersHorizontal size={16} color="#94a3b8" />
          <span className="filter-label">Sort By:</span>
          <select
            className="select-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>
    </div>
  );
}