import "./FeaturedCollections.css";

import SectionTitle from "../UI/SectionTitle/SectionTitle";
import ProductCard from "../ProductCard/ProductCard";

const featuredProducts = [
  {
    id: 1,
    badge: "Best Seller",
    name: "Royal Leather Handbag",
    brand: "Luxe Signature",
    rating: "4.9",
    price: "249",
    discount: "20",
  },
  {
    id: 2,
    badge: "New Arrival",
    name: "Executive Office Bag",
    brand: "Elite Craft",
    rating: "4.8",
    price: "199",
    discount: "15",
  },
  {
    id: 3,
    badge: "Trending",
    name: "Premium Travel Bag",
    brand: "Travel Luxe",
    rating: "5.0",
    price: "299",
    discount: "25",
  },
  {
    id: 4,
    badge: "Limited Edition",
    name: "Classic Laptop Bag",
    brand: "Executive Edition",
    rating: "4.9",
    price: "189",
    discount: "18",
  },
  {
    id: 5,
    badge: "Editor's Pick",
    name: "Elegant Crossbody Bag",
    brand: "Royal Leather",
    rating: "4.8",
    price: "159",
    discount: "12",
  },
  {
    id: 6,
    badge: "Luxury Choice",
    name: "Premium Leather Wallet",
    brand: "Prestige Series",
    rating: "5.0",
    price: "99",
    discount: "10",
  },
];

function FeaturedCollections() {
  return (
    <section className="featured-section">

      <div className="container">

        <SectionTitle
          subtitle="Exclusive Selection"
          title="Featured Collections"
        />

        <div className="featured-grid">

          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              badge={product.badge}
              name={product.name}
              brand={product.brand}
              rating={product.rating}
              price={product.price}
              discount={product.discount}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedCollections;