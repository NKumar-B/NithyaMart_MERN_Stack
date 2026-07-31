import { FiStar } from 'react-icons/fi';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  return (
    <div className="review-card fade-up">
      <div className="review-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
        ))}
      </div>
      <p>"{review.comment}"</p>
      <div className="review-author">
        <span className="review-avatar">{review.avatar}</span>
        <span>{review.name}</span>
      </div>
    </div>
  );
}
