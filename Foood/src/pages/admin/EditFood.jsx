import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import FoodForm from '../../components/admin/FoodForm';
import foodService from '../../services/foodService';
import Loader from '../../components/Loader';
import './Dashboard.css';

export default function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    foodService.getFoodById(id).then((data) => {
      setFood(data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (foodData) => {
    await foodService.updateFood(id, foodData);
    navigate('/admin/foods');
  };

  if (loading) return <Loader label="Loading item…" />;

  if (!food) {
    return (
      <div className="empty-state">
        <h3>Item not found</h3>
        <Link to="/admin/foods" className="btn btn-primary">Back to Manage Foods</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Edit Food</h1>
          <p>Update details for "{food.name}".</p>
        </div>
      </div>
      <FoodForm initialValues={food} onSubmit={handleSubmit} submitLabel="Update Food" />
    </div>
  );
}
