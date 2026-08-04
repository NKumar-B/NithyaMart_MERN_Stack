function Navbar({ cartCount, onCartClick }) {
  return (
    <header>
      <h1>✨ Fragrance Hub</h1>

      <nav>
        <a href="#perfumes">Perfumes</a>
        <a href="#room">Room Sprays</a>
        <a href="#pooja">Pooja</a>
        <a href="#bathroom">Bathroom</a>
        <a href="#candles">Candles</a>
        <a href="#oils">Essential Oils</a>
        <button className="cart-toggle-btn" onClick={onCartClick}>
          🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;