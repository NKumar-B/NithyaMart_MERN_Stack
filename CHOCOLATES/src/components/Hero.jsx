import "../styles/Hero.css";

const Hero = () => {

  const handleShopClick = () => {
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="hero-content">

        <h1>Premium Chocolate Collection</h1>

        <p>
          Discover the world's finest luxury chocolates from top international
          brands.
        </p>

        <button onClick={handleShopClick}>
          Shop Now
        </button>

      </div>
    </section>
  );
};

export default Hero;