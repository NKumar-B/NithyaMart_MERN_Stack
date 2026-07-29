import "../styles/ChocolateCard.css";

const ChocolateCard = ({ chocolate }) => {
  return (
    <div className="card">

      <img src={chocolate.image} alt={chocolate.name} />

      <h3>{chocolate.name}</h3>

      <p className="brand">{chocolate.brand}</p>

      <h2>₹{chocolate.price}</h2>

      <p className="rating">⭐ {chocolate.rating}</p>

      <button>Add to Cart</button>

    </div>
  );
};

export default ChocolateCard;