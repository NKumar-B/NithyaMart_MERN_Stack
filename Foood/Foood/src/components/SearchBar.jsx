import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search for burgers, pizza, wraps…' }) {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search food"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <FiX />
        </button>
      )}
    </div>
  );
}
