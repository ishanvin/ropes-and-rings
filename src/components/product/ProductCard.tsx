import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { getWhatsAppOrderUrl } from '../../utils/contact';
import './ProductCard.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const priceLabel = product.price > 0 ? `Rs. ${product.price.toFixed(2)}` : 'Ask for price';
  const whatsappUrl = getWhatsAppOrderUrl(product.name);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <div className="product-card-overlay">
          <span>View Details</span>
        </div>
      </Link>
      <div className="product-card-info">
        <p className="product-card-category">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        <p className="product-card-price">{priceLabel}</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="w-full mt-sm">
            Order on WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
