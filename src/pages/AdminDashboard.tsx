import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from '../components/common/Button';
import { useAuth } from '../context/useAuth';

const AdminDashboard = () => {
  const { products, deleteProduct, isLoading, error } = useStore();
  const { signOut } = useAuth();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setDeleteError(null);
      try {
        await deleteProduct(id);
      } catch (deleteProductError) {
        setDeleteError(deleteProductError instanceof Error ? deleteProductError.message : 'Unable to delete the product.');
      }
    }
  };

  const handleLogout = async () => {
    setLogoutError(null);
    try {
      await signOut();
    } catch (signOutError) {
      setLogoutError(signOutError instanceof Error ? signOutError.message : 'Unable to log out.');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/products/new">
            <Button>Add New Product</Button>
          </Link>
          <Button variant="outline" onClick={() => void handleLogout()}>Logout</Button>
        </div>
      </div>
      
      {(error || deleteError || logoutError) && <p role="alert" style={{ color: 'var(--error-color, #b42318)' }}>{logoutError ?? deleteError ?? error}</p>}
      {isLoading ? (
        <p>Loading products…</p>
      ) : products.length === 0 ? (
        <p>No products available. Add some!</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Product</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Price</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={product.imageUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      {product.name}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{product.category}</td>
                  <td style={{ padding: '1rem' }}>{product.price > 0 ? `Rs. ${product.price.toFixed(2)}` : 'Ask for price'}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="text" size="sm" onClick={() => void handleDelete(product.id)} style={{ color: 'red' }}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
