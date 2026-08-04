import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import BestSellers from "../../components/BestSellers/BestSellers";
import LuxuryBrands from "../../components/LuxuryBrands/LuxuryBrands";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle";
import storeBagImage from "../../assets/products/luxury.jpg";
import "./Home.css";


function Home() {

  return (

    <>

      <Navbar />

      <main>

        <Hero />

        <Categories />

        <section id="offers" className="offers-section">
          <div className="container">
            <SectionTitle
              subtitle="Best Deals"
              title="Special Offers"
            />
            <div className="offers-grid">
              <article className="offer-card">
                <h3>Summer Luxury Sale</h3>
                <p>Up to 30% off on selected premium handbags.</p>
              </article>
              <article className="offer-card">
                <h3>Free Express Shipping</h3>
                <p>Enjoy free delivery on orders over $150.</p>
              </article>
              <article className="offer-card">
                <h3>Bundle Gift Set</h3>
                <p>Get a free wallet with every purchase above $200.</p>
              </article>
            </div>
          </div>
        </section>

        <BestSellers />

        <LuxuryBrands />

        <NewArrivals />

        <section id="location" className="store-location-section">
          <div className="container">
            <div className="store-location-header">
              <SectionTitle
                subtitle="Your destination"
                title="Store Location"
              />
            </div>
            <div className="store-location-card">
              <div className="store-location-visual">
                <img
                  src={storeBagImage}
                  alt="Luxury handbag display"
                />
                <div className="store-location-badge">Visit the destination</div>
              </div>

              <div className="store-location-content">
                <p className="store-location-intro">
                  Discover a refined retail experience at Grand Meridian Mall, where
                  luxury boutiques, signature dining, and elegant leisure spaces come
                  together in one memorable destination.
                </p>

                <div className="location-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <div>
                      <h4>Full Address</h4>
                      <p>45 Meridian Avenue, Downtown District, New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">🕒</span>
                    <div>
                      <h4>Opening Hours</h4>
                      <p>Mon–Sat: 10:00 AM – 9:00 PM • Sun: 11:00 AM – 7:00 PM</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <div>
                      <h4>Contact Number</h4>
                      <p>+1 (212) 555-0188</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">🚗</span>
                    <div>
                      <h4>Parking Availability</h4>
                      <p>Valet parking, EV charging, and covered garage access available.</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">✉️</span>
                    <div>
                      <h4>Email</h4>
                      <p>visit@grandmeridianmall.com</p>
                    </div>
                  </div>
                </div>

                <div className="location-map-wrapper">
                  <iframe
                    title="Grand Meridian Mall Map"
                    src="https://www.google.com/maps?q=45%20Meridian%20Avenue%20New%20York&z=14&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container">
            <SectionTitle
              subtitle="Our Story"
              title="About LuxeBags"
            />
            <div className="about-content-wrapper">
              <p>
                LuxeBags was established with a singular vision: to create timeless companions for life's daily journeys. We blend heritage craftsmanship with modern functionality, sourcing the finest full-grain Italian leathers, luxury hardware, and sustainable fabrics.
              </p>
              <p style={{ marginTop: '1.2rem' }}>
                Every stitch is placed with precision by master artisans who have spent decades perfecting their craft. From hand-burnished edges to reinforced structural seams, our dedication to quality, durability, and ethical sourcing ensures your bag stays pristine for years to come.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container">
            <SectionTitle
              subtitle="Get in Touch"
              title="Contact Us"
            />
            <div className="contact-info-grid" style={{ marginTop: '1.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
              <div>
                <p>
                  Have questions about our current collection, custom orders, or shipping timelines? Our customer concierge desk is available 24/7 to provide assistance.
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ margin: '0 0 0.8rem 0' }}><strong>📧 Concierge Email:</strong> support@luxebags.com</p>
                <p style={{ margin: '0 0 0.8rem 0' }}><strong>📞 Customer Service:</strong> +1 (555) 123-4567</p>
                <p style={{ margin: '0' }}><strong>🏢 Corporate Suite:</strong> 725 Fifth Avenue, Manhattan, NY</p>
              </div>
            </div>
          </div>
        </section>

      </main>

    </>

  );

}


export default Home;