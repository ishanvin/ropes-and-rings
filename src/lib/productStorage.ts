import type { StorageError } from '@supabase/storage-js';
import { supabase } from './supabase';

// Keep this configurable for deployments while defaulting to the bucket already
// created in Supabase. This value must match the bucket_id in storage-policies.sql.
export const PRODUCT_IMAGES_BUCKET = import.meta.env.VITE_SUPABASE_PRODUCTS_BUCKET?.trim() || 'Products';

// Deliberately excludes credentials. The value is shared by all Storage calls.
console.info('[Supabase Storage] Product images bucket:', PRODUCT_IMAGES_BUCKET);

export const createProductImagePath = (productId: string, fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  return `${productId}/${crypto.randomUUID()}.${extension}`;
};

const storageErrorMessage = (action: 'upload' | 'delete', error: StorageError) => {
  if (error.message.toLowerCase().includes('bucket not found')) {
    return `The Supabase Storage bucket "${PRODUCT_IMAGES_BUCKET}" was not found. Create a public bucket with this exact name in the Supabase project configured by VITE_SUPABASE_URL, or set VITE_SUPABASE_PRODUCTS_BUCKET to the correct bucket name.`;
  }

  return `Unable to ${action} product image${action === 'upload' ? 's' : ''}: ${error.message}`;
};

export const uploadProductImage = async (productId: string, file: File) => {
  const path = createProductImagePath(productId, file.name);
  const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
  });

  if (error) throw new Error(storageErrorMessage('upload', error));

  // The bucket is public, so this returns a stable URL without requiring a
  // signed URL. The same bucket constant is used for upload and URL generation.
  return supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
};
