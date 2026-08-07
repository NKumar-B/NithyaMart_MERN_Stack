import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="luxe-footer">
      <div className="container luxe-footer-container">
        <div className="footer-brand-section">
          <h2 className="footer-logo">LuxeBags</h2>
          <p className="footer-tagline">
            Crafting timeless companions for life's journeys. Experience heritage craftsmanship combined with modern elegance.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook">Facebook</a>
            <a href="#" className="social-icon" aria-label="Instagram">Instagram</a>
            <a href="#" className="social-icon" aria-label="Pinterest">Pinterest</a>
            <a href="#" className="social-icon" aria-label="Twitter">Twitter</a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h3>Shop Collections</h3>
            <ul>
              <li><Link to="/category/luxury-handbags">Luxury Handbags</Link></li>
              <li><Link to="/category/office-bags">Office Bags</Link></li>
              <li><Link to="/category/school-bags">School Bags</Link></li>
              <li><Link to="/category/travel-bags">Travel Bags</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Customer Care</h3>
            <ul>
              <li><a href="#contact">Contact Support</a></li>
              <li><a href="#location">Store Locations</a></li>
              <li><a href="#offers">Active Offers</a></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="footer-contact-info">
              <li>
                <span className="contact-label">📍 Address:</span> 
                <span>725 Fifth Avenue, Manhattan, NY</span>
              </li>
              <li>
                <span className="contact-label">📞 Support:</span> 
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <span className="contact-label">✉️ Email:</span> 
                <span>support@luxebags.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© 2026 LuxeBags Premium Ltd. All rights reserved.</p>
          <div className="footer-payments">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">RuPay</span>
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
