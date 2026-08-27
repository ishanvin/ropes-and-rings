import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();

    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          Ropes<span> & Rings</span>
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </form>
          <Link to="/admin" className="navbar-admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
