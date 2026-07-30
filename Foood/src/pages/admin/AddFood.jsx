import { useNavigate } from 'react-router-dom';
import FoodForm from '../../components/admin/FoodForm';
import foodService from '../../services/foodService';
import './Dashboard.css';

export default function AddFood() {
  const navigate = useNavigate();

  const handleSubmit = async (foodData) => {
    await foodService.addFood(foodData);
    navigate('/admin/foods');
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Add Food</h1>
          <p>Create a new item for the veg or non-veg menu.</p>
        </div>
      </div>
      <FoodForm onSubmit={handleSubmit} submitLabel="Add Food" />
    </div>
  );
}
