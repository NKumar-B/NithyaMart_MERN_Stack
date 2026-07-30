import { useEffect, useState } from 'react';
import foodService from '../services/foodService';

// Generic hook for pulling food data with loading/error state.
// category: 'Veg' | 'Non-Veg' | undefined (all)
export function useFoods(category) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const fetcher = category ? foodService.getFoodsByCategory(category) : foodService.getAllFoods();
    fetcher
      .then((data) => {
        if (active) setFoods(data);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load foods');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [category]);

  return { foods, loading, error };
}

export default useFoods;
