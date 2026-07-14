import { createClient } from '@supabase/supabase-js';

const userId = 'b2e3cc1c-7475-4204-bd88-63a08e2a8a97';
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error('Run with: node --env-file=.env.admin.local scripts/set-admin-role.mjs');
  process.exit(1);
}

// This file is intentionally outside src/ and uses non-VITE_ variables. Vite
// only exposes VITE_* variables to browser code, so this key stays server-side.
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.updateUserById(userId, {
  app_metadata: { role: 'admin' },
});

if (error) {
  console.error(`Unable to make ${userId} an admin: ${error.message}`);
  process.exit(1);
}

console.log(`Admin role set for ${data.user.id}.`);
