import { useEffect, useState } from 'react';
import { FiPackage, FiPieChart } from 'react-icons/fi';
import { GiHamburger, GiChickenLeg } from 'react-icons/gi';
import { FiClock, FiCheckCircle, FiShoppingBag } from 'react-icons/fi';
import foodService from '../../services/foodService';
import orderService from '../../services/orderService';
import Loader from '../../components/Loader';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([foodService.getAllFoods(), orderService.getAllOrders()]).then(([foods, orders]) => {
      const today = new Date().toDateString();
      setStats({
        totalFoods: foods.length,
        vegItems: foods.filter((f) => f.category === 'Veg').length,
        nonVegItems: foods.filter((f) => f.category === 'Non-Veg').length,
        todaysOrders: orders.filter((o) => new Date(o.createdAt).toDateString() === today).length,
        pendingOrders: orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length,
        completedOrders: orders.filter((o) => o.status === 'Completed').length,
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader label="Crunching the numbers…" />;

  const cards = [
    { label: 'Total Foods', value: stats.totalFoods, icon: <FiPieChart />, tone: 'blue' },
    { label: 'Veg Items', value: stats.vegItems, icon: <GiHamburger />, tone: 'green' },
    { label: 'Non-Veg Items', value: stats.nonVegItems, icon: <GiChickenLeg />, tone: 'red' },
    { label: "Today's Orders", value: stats.todaysOrders, icon: <FiShoppingBag />, tone: 'amber' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: <FiClock />, tone: 'orange' },
    { label: 'Completed Orders', value: stats.completedOrders, icon: <FiCheckCircle />, tone: 'green' },
  ];

  return (
    <div>
      <div className="admin-page-head">
        <h1>Dashboard</h1>
        <p>A quick pulse on the food court's menu and orders.</p>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className={`stat-card stat-${card.tone}`}>
            <div className="stat-icon">{card.icon}</div>
            <div>
              <span className="stat-value">{card.value}</span>
              <span className="stat-label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-note">
        <FiPackage />
        <p>This dashboard reflects local demo data. Connect the Spring Boot API in <code>src/services</code> to go live.</p>
      </div>
    </div>
  );
}
