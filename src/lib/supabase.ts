import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.',
  );
}

// Deliberately excludes credentials. This makes the active Vite environment
// visible when diagnosing configuration mismatches in the browser console.
console.info('[Supabase] Project URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
