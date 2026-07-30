import './Hero.css';

export default function StatsCard({ icon, label, value }) {
  return (
    <div className="stats-card">
      <span className="stats-icon">{icon}</span>
      <div>
        <strong className="stats-value">{value}</strong>
        <span className="stats-label">{label}</span>
      </div>
    </div>
  );
}

