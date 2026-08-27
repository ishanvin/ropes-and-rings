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

      <section className="our-story" aria-labelledby="our-story-title">
        <div className="container our-story__inner">
          <header className="our-story__intro">
            <p className="our-story__eyebrow">Since 1995 · Hyderabad</p>
            <h2 id="our-story-title">Our Story</h2>
            <p>
              The heart behind Ropes &amp; Rings discovered the magic of knotting as a school child. What began as a hobby, nurtured by teachers, became a life’s purpose in 1995. From a home in Hyderabad, every creation is handcrafted individually — no machines, just love, patience, and fine cotton ropes.
            </p>
          </header>

          <div className="our-story__details">
            <article className="our-story__block">
              <h3>What We Create</h3>
              <p>Beautiful macramé art for everyday use — decorative pot hangers, planters, owls, and thoughtful handmade décor.</p>
            </article>
            <article className="our-story__block">
              <h3>Made for Meaningful Gifting</h3>
              <ul>
                <li>Return gifts for birthdays and parties</li>
                <li>Festival gifts for Diwali, Christmas, Valentine’s Day, and more</li>
                <li>Utility gifts including keychains, bag tags, doll keychains, waist belts, and curtain ropes</li>
              </ul>
            </article>
          </div>

          <div className="our-story__closing">
            <p className="our-story__statement">Each knot tells a story.</p>
            <p className="our-story__highlight">
              <span>ROPES &amp; RINGS, Hyderabad</span>
              <span>100% Handmade · Eco-Friendly · Custom Orders Available</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
