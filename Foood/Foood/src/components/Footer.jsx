import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span>🍔</span> Bite<span className="accent">Court</span>
          </div>
          <p>
            The mall's favourite stop for crave-worthy veg and non-veg junk food — made fresh,
            served fast, straight from Counter 1 to your tray.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </div>

        <div>
          <h4>About</h4>
          <p>
            BiteCourt Food Zone is the mall's dedicated junk-food court, home to 6 kitchens
            serving burgers, pizzas, wraps, and crispy sides — veg and non-veg, no beverages,
            no desserts, just the good stuff.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/menu">Full Menu</Link></li>
            <li><Link to="/veg">Veg Specials</Link></li>
            <li><Link to="/non-veg">Non-Veg Specials</Link></li>
            <li><Link to="/orders">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><FiMapPin /> Level 2, Food Court Zone, City Center Mall, Hyderabad</li>
            <li><FiPhone /> +91 98765 43210</li>
            <li><FiMail /> hello@bitecourt.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} BiteCourt Food Zone. All rights reserved.</span>
          <span>Open daily · 10:00 AM – 10:00 PM</span>
        </div>
      </div>
    </footer>
  );
}
