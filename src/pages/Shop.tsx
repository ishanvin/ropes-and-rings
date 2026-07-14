import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useStore } from '../context/StoreContext';
import SEO from '../components/common/SEO';
import './Shop.css';

const Shop = () => {
  const { products, isLoading, error } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ?? 'All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') ?? 'All');
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-page container fade-in">
      <SEO 
        title={`Shop ${selectedCategory !== 'All' ? selectedCategory : 'Collections'}`} 
        description={`Explore our ${selectedCategory !== 'All' ? selectedCategory.toLowerCase() : 'full collection'} of boutique accessories and lifestyle items.`}
      />
      <header className="shop-header">
        <h1>All Collections</h1>
        <div className="shop-filters">
          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isLoading && <div className="no-results"><p>Loading products…</p></div>}
      {error && <div className="no-results"><p>Unable to load products: {error}</p></div>}

      {!isLoading && !error && filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
