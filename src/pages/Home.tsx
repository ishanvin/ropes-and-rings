import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import { useStore } from '../context/StoreContext';
import './Home.css';

const Home = () => {
  const { products } = useStore();
  const featuredCategories = (products.filter(product => product.featured).length ? products.filter(product => product.featured) : products).slice(0, 3);

  return (
    <div className="home-page fade-in">
      <SEO />
      <section className="hero">
        <div className="container hero-content">
          <h1>Ropes & Rings</h1>
          <h2>Woven for Every Occasion</h2>
          <p>Handcrafted macramé for gifts, decor and life's special moments.</p>
          <div className="hero-actions">
            <Link to="/shop">
              <Button size="lg">Shop macramé</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-categories container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {featuredCategories.map(category => (
            <Link to={`/shop?category=${encodeURIComponent(category.category)}`} className="category-card" key={category.id}>
              <img src={category.imageUrl} alt={category.name} loading="lazy" />
              <div className="category-overlay">
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
