import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductForm from '../components/admin/ProductForm';
import type { ProductDraft } from '../types/product';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useStore();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  const handleSubmit = async (data: ProductDraft, imageFiles: File[]) => {
    if (id) {
      await updateProduct(id, data, imageFiles);
      navigate('/admin');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <ProductForm 
        title="Edit Product" 
        initialData={{ name: product.name, category: product.category, price: product.price, description: product.description, featured: product.featured, images: product.images }}
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default EditProduct;
