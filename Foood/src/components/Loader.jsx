import './Loader.css';

export default function Loader({ label = 'Loading tasty stuff…' }) {
  return (
    <div className="loader-wrap">
      <div className="loader-plate">
        <span className="loader-bite" />
      </div>
      <p>{label}</p>
    </div>
  );
}
