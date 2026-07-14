import { useState } from 'react';
import Button from '../common/Button';
import type { ProductDraft } from '../../types/product';

interface ProductFormProps {
  initialData?: ProductDraft;
  onSubmit: (data: ProductDraft, imageFiles: File[]) => Promise<void>;
  title: string;
}

const ProductForm = ({ initialData, onSubmit, title }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductDraft>({
    name: '',
    category: '',
    price: 0,
    description: '',
    featured: false,
    images: [],
    ...initialData,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const isCheckbox = event.target instanceof HTMLInputElement && event.target.type === 'checkbox';
    setFormData(current => ({
      ...current,
      [name]: isCheckbox ? (event.target as HTMLInputElement).checked : name === 'price' ? Number(value) : value,
    }));
  };

  const removeExistingImage = (url: string) => {
    setFormData(current => ({ ...current, images: current.images.filter(image => image !== url) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.images.length + imageFiles.length === 0) {
      setSubmitError('Add at least one product image.');
      return;
    }

    setIsSaving(true);
    setSubmitError(null);
    try {
      await onSubmit(formData, imageFiles);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to save the product.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>{title}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
            <option value="">Select Category</option>
            <option value="Bag Tags">Bag Tags</option>
            <option value="Handle Hangings">Decorative Hangings</option>
            <option value="Pot Hangers">Pot Hangers</option>
            <option value="Pencil Cases">Pencil Cases</option>
            <option value="Key Chains">Key Chains</option>
            <option value="Wall Decor">Wall Decor</option>
            <option value="Curtain Accessories">Curtain Accessories</option>
            <option value="Waist Belts">Waist Belts</option>
            <option value="Pen Holders">Pen Holders</option>
          </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price Per Each(Rs.)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Product Images</label>
          <input type="file" accept="image/*" multiple onChange={event => setImageFiles(Array.from(event.target.files ?? []))} />
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>The first image is the default product image. Additional images are available in the carousel.</p>
          {formData.images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
              {formData.images.map((image, index) => (
                <div key={image} style={{ position: 'relative' }}>
                  <img src={image} alt={`Existing product image ${index + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  <button type="button" onClick={() => removeExistingImage(image)} aria-label={`Remove image ${index + 1}`} style={{ position: 'absolute', top: '-8px', right: '-8px', border: 0, borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer' }}>×</button>
                </div>
              ))}
            </div>
          )}
          {imageFiles.length > 0 && <p style={{ margin: '0.75rem 0 0' }}>{imageFiles.length} new image{imageFiles.length === 1 ? '' : 's'} ready to upload.</p>}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          Feature this product
        </label>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px', height: '120px', resize: 'vertical' }} />
        </div>
        {submitError && <p role="alert" style={{ color: 'var(--error-color, #b42318)', margin: 0 }}>{submitError}</p>}
        <Button type="submit" size="lg" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save Product'}</Button>
      </form>
    </div>
  );
};

export default ProductForm;
