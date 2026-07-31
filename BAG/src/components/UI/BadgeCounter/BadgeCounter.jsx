import "./BadgeCounter.css";

function BadgeCounter({ count }) {
  return (
    <span className="badge-counter">
      {count}
    </span>
  );
}

export default BadgeCounter;
