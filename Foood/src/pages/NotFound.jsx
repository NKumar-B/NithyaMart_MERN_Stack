import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container empty-state" style={{ padding: '100px 20px' }}>
      <h1 style={{ fontSize: '3rem' }}>🍔 404</h1>
      <h3>This page isn't on the menu</h3>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
