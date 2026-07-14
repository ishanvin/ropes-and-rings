import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadProductImage } from '../lib/productStorage';
import type { Product, ProductDraft } from '../types/product';

type ProductRow = Omit<Product, 'imageUrl'>;

type SupabaseErrorDetails = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
};

interface StoreContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: ProductDraft, imageFiles: File[]) => Promise<void>;
  updateProduct: (id: string, product: ProductDraft, imageFiles: File[]) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const toProduct = (product: ProductRow): Product => ({
  ...product,
  images: product.images ?? [],
  imageUrl: product.images?.[0] ?? '',
});

const createProductSlug = (name: string, id: string) => {
  const base = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'product';

  // The UUID suffix preserves a readable name while satisfying the database's
  // unique constraint even when two products have the same name.
  return `${base}-${id.slice(0, 8)}`;
};

const describeSupabaseError = (error: SupabaseErrorDetails) => {
  const code = error.code ? ` (code: ${error.code})` : '';
  return `${error.message ?? 'Supabase request failed.'}${code}`;
};

const logSupabaseError = (operation: string, error: SupabaseErrorDetails, payload?: unknown) => {
  if (import.meta.env.DEV) {
    console.error(`[Supabase] ${operation} failed`, {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      payload,
    });
  }
};

const uploadImages = async (productId: string, files: File[]) => {
  // Promise.all returns results in the same sequence as `files`, even though
  // uploads run concurrently. That sequence becomes the images[] order.
  const uploadedUrls = await Promise.all(files.map(file => uploadProductImage(productId, file)));

  return uploadedUrls;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('products')
      .select('id, name, slug, category, description, price, images, featured, created_at')
      .order('created_at', { ascending: false });

    if (queryError) {
      setError(queryError.message);
    } else {
      setProducts((data as ProductRow[]).map(toProduct));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refreshProducts();
  }, [refreshProducts]);

  const addProduct = async (draft: ProductDraft, imageFiles: File[]) => {
    const id = crypto.randomUUID();
    const uploadedImages = await uploadImages(id, imageFiles);
    const images = [...draft.images, ...uploadedImages];
    const payload = {
      id,
      slug: createProductSlug(draft.name, id),
      name: draft.name.trim(),
      category: draft.category,
      description: draft.description.trim(),
      price: draft.price,
      images,
      featured: draft.featured,
    };

    if (!payload.name || !payload.category || !payload.description || !Number.isFinite(payload.price) || payload.price < 0 || payload.images.length === 0) {
      throw new Error('Name, category, description, a non-negative price, and at least one image are required.');
    }

    if (import.meta.env.DEV) console.debug('[Supabase] Product insert payload', payload);

    const { data, error: insertError } = await supabase
      .from('products')
      .insert(payload)
      .select('id, name, slug, category, description, price, images, featured, created_at')
      .single();

    if (insertError) {
      logSupabaseError('Product insert', insertError, payload);
      throw new Error(describeSupabaseError(insertError));
    }
    setProducts(current => [toProduct(data as ProductRow), ...current]);
  };

  const updateProduct = async (id: string, draft: ProductDraft, imageFiles: File[]) => {
    const uploadedImages = await uploadImages(id, imageFiles);
    const { data, error: updateError } = await supabase
      .from('products')
      .update({ ...draft, images: [...draft.images, ...uploadedImages] })
      .eq('id', id)
      .select('id, name, slug, category, description, price, images, featured, created_at')
      .single();

    if (updateError) {
      logSupabaseError('Product update', updateError);
      throw new Error(describeSupabaseError(updateError));
    }
    setProducts(current => current.map(product => product.id === id ? toProduct(data as ProductRow) : product));
  };

  const deleteProduct = async (id: string) => {
    const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
    if (deleteError) throw deleteError;
    setProducts(current => current.filter(product => product.id !== id));
  };

  return (
    <StoreContext.Provider value={{ products, isLoading, error, addProduct, updateProduct, deleteProduct, refreshProducts }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
