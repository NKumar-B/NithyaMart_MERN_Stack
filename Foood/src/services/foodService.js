// ==========================================================================
// Food service — reads from local JSON for now. Every function is written
// so that swapping to the real Spring Boot API later only means
// uncommenting the axios call and removing the local-data line.
// ==========================================================================
import api from './api';
import foodsData from '../data/foods.json';

// Simulates network latency so loaders/skeletons are visible during dev
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const foodService = {
  // GET /foods
  async getAllFoods() {
    await delay();
    return foodsData;
    // return (await api.get('/foods')).data;
  },

  // GET /foods/:id
  async getFoodById(id) {
    await delay();
    return foodsData.find((food) => String(food.id) === String(id));
    // return (await api.get(`/foods/${id}`)).data;
  },

  // GET /foods?category=Veg
  async getFoodsByCategory(category) {
    await delay();
    return foodsData.filter((food) => food.category === category);
    // return (await api.get('/foods', { params: { category } })).data;
  },

  // GET /foods?popular=true
  async getPopularFoods() {
    await delay();
    return foodsData.filter((food) => food.popular);
  },

  // GET /foods?featured=true
  async getFeaturedFoods() {
    await delay();
    return foodsData.filter((food) => food.featured);
  },

  // POST /foods (admin)
  async addFood(food) {
    await delay();
    return { ...food, id: Date.now() };
    // return (await api.post('/foods', food)).data;
  },

  // PUT /foods/:id (admin)
  async updateFood(id, updates) {
    await delay();
    return { id, ...updates };
    // return (await api.put(`/foods/${id}`, updates)).data;
  },

  // DELETE /foods/:id (admin)
  async deleteFood(id) {
    await delay();
    return { success: true, id };
    // return (await api.delete(`/foods/${id}`)).data;
  },
};

export default foodService;
