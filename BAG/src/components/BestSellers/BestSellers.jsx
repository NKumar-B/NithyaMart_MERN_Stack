import "./BestSellers.css";

import SectionTitle from "../UI/SectionTitle/SectionTitle";
import ProductCard from "../ProductCard/ProductCard";
import bestSeller1 from "../../assets/products/best-seller-1.png";
import bestSeller2 from "../../assets/products/best-seller-2.png";
import bestSeller3 from "../../assets/products/best-seller-3.png";

const bestSellerProducts = [
  {
    id: 1,
    badge: "Best Seller",
    name: "Hermès Birkin Tote",
    brand: "Hermès",
    rating: "5.0",
    price: "3490",
    discount: "12",
    image: bestSeller1,
  },
  {
    id: 2,
    badge: "Top Rated",
    name: "Louis Vuitton Neverfull",
    brand: "Louis Vuitton",
    rating: "4.9",
    price: "1990",
    discount: "15",
    image: bestSeller2,
  },
  {
    id: 3,
    badge: "Most Loved",
    name: "Chanel Classic Flap",
    brand: "Chanel",
    rating: "5.0",
    price: "5790",
    discount: "10",
    image: bestSeller3,
  },
  {
    id: 4,
    badge: "Luxury Pick",
    name: "Gucci Marmont Shoulder Bag",
    brand: "Gucci",
    rating: "4.9",
    price: "2290",
    discount: "18",
    image:
      "https://via.placeholder.com/400x300.png?text=Gucci+Marmont+Bag",
  },
  {
    id: 5,
    badge: "Exclusive",
    name: "Burberry TB Bag",
    brand: "Burberry",
    rating: "4.8",
    price: "2150",
    discount: "14",
    image:
      "https://via.placeholder.com/400x300.png?text=Burberry+TB+Bag",
  },
];

function BestSellers() {
  return (
    <section className="best-sellers">

      <div className="container">

        <SectionTitle
          subtitle="Most Popular Collection"
          title="Best Sellers"
        />

        <div className="best-seller-grid">

          {bestSellerProducts.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default BestSellers;