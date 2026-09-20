import { createClient } from '@supabase/supabase-js';

const userIds = [
  'b2e3cc1c-7475-4204-bd88-63a08e2a8a97',
  '68fcfb74-0160-4843-b5bf-20777f73bc37',
];

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error(
    'Run with: node --env-file=.env.admin.local scripts/set-admin-role.mjs'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

for (const userId of userIds) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { role: 'admin' },
  });

  if (error) {
    console.error(`Unable to make ${userId} an admin: ${error.message}`);
    process.exit(1);
  }

  console.log(`Admin role set for ${data.user.id}.`);
}