import "./LuxuryBrands.css";

import hermesLogo from "../../assets/brands/hermes.png";
import louisLogo from "../../assets/brands/louis-vuitton.png";
import burberryLogo from "../../assets/brands/burberry.png";
import gucciLogo from "../../assets/brands/gucci.png";
import chanelLogo from "../../assets/brands/chanel.png";
import SectionTitle from "../UI/SectionTitle/SectionTitle";

const brands = [
  {
    id: 1,
    name: "Hermès",
    description: "Timeless French luxury leather goods.",
    logo: hermesLogo,
  },
  {
    id: 2,
    name: "Louis Vuitton",
    description: "Iconic travel bags and statement accessories.",
    logo: louisLogo,
  },
  {
    id: 3,
    name: "Burberry",
    description: "Heritage style with refined craftsmanship.",
    logo: burberryLogo,
  },
  {
    id: 4,
    name: "Gucci",
    description: "Bold, contemporary luxury fashion.",
    logo: gucciLogo,
  },
  {
    id: 5,
    name: "Chanel",
    description: "Elegant couture and timeless handbags.",
    logo: chanelLogo,
  },
];

function LuxuryBrands() {
  return (
    <section id="brands" className="luxury-brands">

      <div className="container">

        <SectionTitle
          subtitle="Exclusive Brands"
          title="Luxury Brand Partners"
        />

        <div className="brand-slider">

          <div className="brand-track">

            {brands.concat(brands).map((brand, index) => (

              <article
                className="brand-card"
                key={index}
              >

                <div className="brand-logo">
                  <img src={brand.logo} alt={brand.name} />
                </div>

                <h3>{brand.name}</h3>

                <p>{brand.description}</p>

              </article>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default LuxuryBrands;
