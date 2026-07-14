import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          Ropes<span> & Rings</span>
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <div className="navbar-search">
            <input type="text" placeholder="Search products..." />
          </div>
          <Link to="/admin" className="navbar-admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
