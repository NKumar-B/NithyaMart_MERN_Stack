import "./NewArrivals.css";

import arrival1 from "../../assets/products/new-arrival-1.png";
import arrival2 from "../../assets/products/new-arrival-2.png";
import arrival3 from "../../assets/products/new-arrival-3.png";
import arrival4 from "../../assets/products/new-arrival-4.png";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import ProductCard from "../ProductCard/ProductCard";

const newArrivalProducts = [
  {
    id: 1,
    badge: "New Arrival",
    name: "Royal Signature Handbag",
    brand: "Luxe Signature",
    rating: "4.9",
    price: "289",
    discount: "20",
    image: arrival1,
  },
  {
    id: 2,
    badge: "Just In",
    name: "Premium Office Messenger Bag",
    brand: "Executive Edition",
    rating: "4.8",
    price: "229",
    discount: "18",
    image: arrival2,
  },
  {
    id: 3,
    badge: "Exclusive",
    name: "Luxury Leather Travel Bag",
    brand: "Travel Luxe",
    rating: "5.0",
    price: "329",
    discount: "15",
    image: arrival3,
  },
  {
    id: 4,
    badge: "Trending",
    name: "Elite Crossbody Bag",
    brand: "Royal Leather",
    rating: "4.9",
    price: "189",
    discount: "12",
    image: arrival4,
  },
  {
    id: 5,
    badge: "Fresh Pick",
    name: "Premium Laptop Backpack",
    brand: "Elite Craft",
    rating: "4.8",
    price: "209",
    discount: "10",
  },
  {
    id: 6,
    badge: "Limited",
    name: "Designer Leather Wallet",
    brand: "Prestige Series",
    rating: "5.0",
    price: "119",
    discount: "8",
  },
];

function NewArrivals() {
  return (
    <section className="new-arrivals">

      <div className="container">

        <SectionTitle
          subtitle="Latest Collection"
          title="New Arrivals"
        />

        <div className="arrival-grid">

          {newArrivalProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              badge={product.badge}
              name={product.name}
              brand={product.brand}
              rating={product.rating}
              price={product.price}
              discount={product.discount}
              image={product.image}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default NewArrivals;