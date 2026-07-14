import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductForm from '../components/admin/ProductForm';
import type { ProductDraft } from '../types/product';

const AddProduct = () => {
  const { addProduct } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductDraft, imageFiles: File[]) => {
    await addProduct(data, imageFiles);
    navigate('/admin');
  };

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <ProductForm title="Add New Product" onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;
