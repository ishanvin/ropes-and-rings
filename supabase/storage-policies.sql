-- Run this in the Supabase SQL Editor for the public `Products` bucket.
-- Public buckets allow public URL reads, but uploads and deletes still need policies.

drop policy if exists "Admins can upload product images" on storage.objects;
drop policy if exists "Admins can update product images" on storage.objects;
drop policy if exists "Admins can delete product images" on storage.objects;

create policy "Admins can upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'Products'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "Admins can update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'Products'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'Products'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "Admins can delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'Products'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
