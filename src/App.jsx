import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const perfumes = [
    {
      name: "Coco Mademoiselle",
      brand: "Brand: Chanel",
      price: "₹16,500",
      image: "/images/channel.avif"
    },
    {
      name: "Sauvage",
      brand: "Brand: Dior",
      price: "₹12,900",
      image: "/images/savuge.jpg"
    },
    {
      name: "Bloom",
      brand: "Brand: Gucci",
      price: "₹11,800",
      image: "/images/gucci.jpg"
    },
    {
      name: "Eros",
      brand: "Brand: Versace",
      price: "₹9,800",
      image: "/images/eros.jpg"
    }
  ];

  const roomSprays = [
    {
      name: "Lavender Spray",
      brand: "Air Wick",
      price: "₹299",
      image: "/images/lavenderfrag.jpg"
    },
    {
      name: "Cool Surf Blue",
      brand: "Godrej aer",
      price: "₹249",
      image: "/images/airfreshner.jpg"
    },
    {
      name: "Rose Bloom",
      brand: "Ambi Pur",
      price: "₹349",
      image: "/images/roomspray1.jpg"
    },
    {
      name: "Linen Sky",
      brand: "Febreze",
      price: "₹39",
      image: "/images/homefrag.jpg"
    }
  ];

  const pooja = [
    {
      name: "Sandal Agarbatti",
      brand: "Cycle Pure",
      price: "₹90",
      image: "/images/agarbatti.jpg"
    },
    {
      name: "Divine Incense",
      brand: "Mangaldeep",
      price: "₹120",
      image: "/images/incence.jpg"
    },
    {
      name: "Dhoop Sticks",
      brand: "Cycle Pure",
      price: "₹140",
      image: "/images/dhoop.jpg"
    },
    {
      name: "Incense Cones",
      brand: "Phool",
      price: "₹250",
      image: "/images/cones.jpg"
    }
  ];

  const bathroom = [
    {
      name: "Bathroom Block",
      brand: "Odonil",
      price: "₹75",
      image: "/images/bath.jpg"
    },
    {
      name: "Automatic Freshener",
      brand: "Air Wick",
      price: "₹499",
      image: "/images/auto.jpg"
    },
    {
      name: "Bathroom Spray",
      brand: "Godrej aer",
      price: "₹149",
      image: "/images/bathspary.avif"
    },
    {
      name: "Hygienic Fresh",
      brand: "Harpic",
      price: "₹199",
      image: "/images/bathcleaner.jpg"
    }
  ];

  const candles = [
    {
      name: "Vanilla Candle",
      brand: "Yankee Candle",
      price: "₹1800",
      image: "/images/vennila.jpg"
    },
    {
      name: "Mahogany",
      brand: "Bath & Body Works",
      price: "₹2200",
      image: "/images/magohny.avif"
    },
    {
      name: "Lavender Candle",
      brand: "Miniso",
      price: "₹399",
      image: "/images/lavendercandle.jpg"
    },
    {
      name: "Jasmine Candle",
      brand: "IKEA",
      price: "₹399",
      image: "/images/jasmine.jpg"
    }
  ];

  const oils = [
    {
      name: "Lavender Oil",
      brand: "Soulflower",
      price: "₹499",
      image: "/images/lavoil.jpg"
    },
    {
      name: "Tea Tree Oil",
      brand: "Organic Harvest",
      price: "₹599",
      image: "/images/teaoil.jpg"
    },
    {
      name: "Reed Diffuser",
      brand: "Home Fragrance",
      price: "₹799",
      image: "/images/reedoil.jpg"
    },
    {
      name: "Aroma Diffuser",
      brand: "Generic",
      price: "₹1499",
      image: "/images/aroma.jpg"
    }
  ];

  return (
    <>
      <Navbar />

      <Hero />

      <ProductSection
        id="perfumes"
        title="🌹 Luxury Perfumes"
        products={perfumes}
      />

      <ProductSection
        id="room"
        title="🏠 Room Sprays"
        products={roomSprays}
      />

      <ProductSection
        id="pooja"
        title="🪔 Pooja Fragrances"
        products={pooja}
      />

      <ProductSection
        id="bathroom"
        title="🚿 Bathroom Fresheners"
        products={bathroom}
      />

      <ProductSection
        id="candles"
        title="🕯️ Scented Candles"
        products={candles}
      />

      <ProductSection
        id="oils"
        title="🌿 Essential Oils"
        products={oils}
      />

      <Footer />
    </>
  );
}

export default App;