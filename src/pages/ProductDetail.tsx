import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from '../components/common/Button';
import ProductGallery from '../components/product/ProductGallery';
import SEO from '../components/common/SEO';
import { getWhatsAppOrderUrl } from '../utils/contact';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  const priceLabel = product.price > 0 ? `Rs. ${product.price.toFixed(2)}` : 'Ask for price';
  const whatsappUrl = getWhatsAppOrderUrl(product.name);
  const galleryImages = product.images?.length ? product.images : [product.imageUrl];

  return (
    <div className="product-detail-page container fade-in">
      <SEO 
        title={product.name} 
        description={product.description} 
        image={product.imageUrl}
      />
      <div className="product-detail-grid">
        <ProductGallery images={galleryImages} alt={product.name} />
        <div className="product-info">
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">{priceLabel}</p>
          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <div className="purchase-note">
            <h3>Before You Order</h3>
            <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li> ✨ Every piece is handcrafted, so slight variations make each item unique.</li>
              <li> 🚚 Courier charges are additional and depend on your location.</li>
              <li> 💳 No Cash on Delivery (COD).</li>
              <li> 📦 All orders are securely bubble-packed for safe shipping.</li>
              <li> ↩️ As each item is handmade, returns and refunds are not available.</li>
            </ul>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-action">
            <Button size="lg" className="w-full">Order on WhatsApp</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
