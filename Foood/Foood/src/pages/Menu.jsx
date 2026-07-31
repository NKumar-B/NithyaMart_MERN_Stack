import { useMemo, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import useFoods from '../hooks/useFoods';
import useDebounce from '../hooks/useDebounce';
import './Menu.css';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹100', min: 0, max: 99 },
  { label: '₹100 – ₹150', min: 100, max: 150 },
  { label: '₹150 – ₹200', min: 150, max: 200 },
  { label: 'Above ₹200', min: 200, max: Infinity },
];

// forcedCategory: pass 'Veg' or 'Non-Veg' to lock the category filter (used by VegMenu/NonVegMenu)
export default function Menu({ forcedCategory, title, subtitle }) {
  const { foods, loading } = useFoods(forcedCategory);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const [category, setCategory] = useState('All');
  const [priceIndex, setPriceIndex] = useState(0);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceIndex];
    return foods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = forcedCategory ? true : category === 'All' || food.category === category;
      const matchesPrice = food.price >= range.min && food.price <= range.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [foods, debouncedSearch, category, priceIndex, forcedCategory]);

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>{title || 'Full Menu'}</h1>
          <p className="section-sub">{subtitle || 'Everything on offer at the food court, in one place.'}</p>
        </div>
      </div>

      <div className="container section">
        <div className="menu-toolbar">
          <SearchBar value={search} onChange={setSearch} />

          {!forcedCategory && (
            <div className="filter-group">
              <FiFilter />
              {['All', 'Veg', 'Non-Veg'].map((c) => (
                <button
                  key={c}
                  className={`filter-chip ${category === c ? 'filter-chip-active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <select
            className="price-select"
            value={priceIndex}
            onChange={(e) => setPriceIndex(Number(e.target.value))}
            aria-label="Filter by price"
          >
            {PRICE_RANGES.map((range, i) => (
              <option key={range.label} value={i}>{range.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No items match your filters</h3>
            <p>Try clearing the search or picking a different price range.</p>
          </div>
        ) : (
          <div className="food-grid menu-grid">
            {filtered.map((food) => <FoodCard key={food.id} food={food} />)}
          </div>
        )}
      </div>
    </div>
  );
}
