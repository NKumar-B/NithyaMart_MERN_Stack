import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import foodService from '../../services/foodService';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import { formatPrice } from '../../utils/formatPrice';
import './Dashboard.css';

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadFoods = () => {
    setLoading(true);
    foodService.getAllFoods().then((data) => {
      setFoods(data);
      setLoading(false);
    });
  };

  useEffect(loadFoods, []);

  const handleDelete = async (food) => {
    if (!window.confirm(`Delete "${food.name}" from the menu?`)) return;
    await foodService.deleteFood(food.id);
    setFoods((prev) => prev.filter((f) => f.id !== food.id));
  };

  const toggleAvailability = (food) => {
    setFoods((prev) =>
      prev.map((f) => (f.id === food.id ? { ...f, available: !f.available } : f))
    );
    foodService.updateFood(food.id, { available: !food.available });
  };

  const filtered = foods.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Loader label="Loading the menu…" />;

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Manage Foods</h1>
          <p>Add, edit, delete, or toggle availability of menu items.</p>
        </div>
        <Link to="/admin/foods/add" className="btn btn-primary">
          <FiPlus /> Add Food
        </Link>
      </div>

      <div className="admin-toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search foods…" />
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((food) => (
              <tr key={food.id}>
                <td>
                  <div className="admin-food-name">
                    <span className="emoji">{food.image}</span> {food.name}
                  </div>
                </td>
                <td>
                  <span className={`badge ${food.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
                    <span className={food.category === 'Veg' ? 'veg-dot' : 'nonveg-dot'} />
                    {food.category}
                  </span>
                </td>
                <td>{formatPrice(food.price)}</td>
                <td>⭐ {food.rating}</td>
                <td>
                  <button className="avail-toggle" onClick={() => toggleAvailability(food)}>
                    <span className={`avail-switch ${food.available ? 'on' : ''}`} />
                    {food.available ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link to={`/admin/foods/edit/${food.id}`} className="icon-btn" aria-label="Edit">
                      <FiEdit2 />
                    </Link>
                    <button className="icon-btn danger" onClick={() => handleDelete(food)} aria-label="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No matching items</h3>
            <p>Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
