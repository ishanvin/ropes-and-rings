import './Footer.css';
import { getWhatsAppOrderUrl, instagramUrl } from '../../utils/contact';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>Ropes & Rings</h3>
          <p>Handmade macramé decor, accessories, and gifts crafted with care, creativity, and quality.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href={getWhatsAppOrderUrl()} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a></li>
          </ul>
          <p className="footer-policy-note">Courier charges extra.<br />No Cash on Delivery (COD).</p>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            {/* Icons would go here */}
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Ropes & Rings. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
