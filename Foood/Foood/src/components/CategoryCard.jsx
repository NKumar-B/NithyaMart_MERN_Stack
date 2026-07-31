import { Link } from 'react-router-dom';
import './CategoryCard.css';

export default function CategoryCard({ to, icon, title, subtitle, tone = 'primary' }) {
  return (
    <Link to={to} className={`category-card category-${tone}`}>
      <span className="category-icon">{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
}
