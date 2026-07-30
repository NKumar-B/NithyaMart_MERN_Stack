import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { GiHamburger, GiChickenLeg } from 'react-icons/gi';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import CategoryCard from '../components/CategoryCard';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';
import foodService from '../services/foodService';
import reviews from '../data/reviews.json';
import './Home.css';

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    foodService.getAllFoods().then((data) => {
      setFoods(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader label="Firing up the kitchens…" />;

  const featured = foods.filter((f) => f.featured).slice(0, 4);
  const vegSpecials = foods.filter((f) => f.category === 'Veg' && f.popular).slice(0, 4);
  const nonVegSpecials = foods.filter((f) => f.category === 'Non-Veg' && f.popular).slice(0, 4);
  const popular = foods.filter((f) => f.popular).slice(0, 8);

  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="section container">
        <div className="category-grid">
          <CategoryCard
            to="/veg"
            icon={<GiHamburger color="#2e7d32" />}
            title="Veg Menu"
            subtitle="Burgers, pizzas & crispy sides"
            tone="secondary"
          />
          <CategoryCard
            to="/non-veg"
            icon={<GiChickenLeg color="#e53935" />}
            title="Non-Veg Menu"
            subtitle="Chicken burgers, wings & wraps"
            tone="primary"
          />
        </div>
      </section>

      {/* Featured */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Chef's Picks</span>
            <h2 className="section-title">Featured Foods</h2>
          </div>
          <Link to="/menu" className="btn btn-ghost">
            View Full Menu <FiArrowRight />
          </Link>
        </div>
        <div className="food-grid">
          {featured.map((food) => <FoodCard key={food.id} food={food} />)}
        </div>
      </section>

      {/* Veg specials */}
      <section className="section section-tinted">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">100% Veg</span>
              <h2 className="section-title">Veg Specials</h2>
              <p className="section-sub">Loaded paneer, cheesy pizzas, and crunchy sides.</p>
            </div>
            <Link to="/veg" className="btn btn-ghost">
              See All Veg <FiArrowRight />
            </Link>
          </div>
          <div className="food-grid">
            {vegSpecials.map((food) => <FoodCard key={food.id} food={food} />)}
          </div>
        </div>
      </section>

      {/* Non-veg specials */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Meat Lovers</span>
            <h2 className="section-title">Non-Veg Specials</h2>
            <p className="section-sub">Juicy chicken burgers, wings, and shawarma rolls.</p>
          </div>
          <Link to="/non-veg" className="btn btn-ghost">
            See All Non-Veg <FiArrowRight />
          </Link>
        </div>
        <div className="food-grid">
          {nonVegSpecials.map((food) => <FoodCard key={food.id} food={food} />)}
        </div>
      </section>

      {/* Popular items */}
      <section className="section section-tinted">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Trending Now</span>
              <h2 className="section-title">Popular Items</h2>
            </div>
          </div>
          <div className="food-grid food-grid-wide">
            {popular.map((food) => <FoodCard key={food.id} food={food} />)}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Loved By Regulars</span>
            <h2 className="section-title">Customer Reviews</h2>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      </section>
    </div>
  );
}
