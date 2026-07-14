-- Run this in the Supabase SQL Editor. RLS policies filter rows, but PostgreSQL
-- grants are also required before the policies can be evaluated.

alter table public.products enable row level security;

grant usage on schema public to anon, authenticated;
grant select on table public.products to anon, authenticated;
grant insert, update, delete on table public.products to authenticated;

drop policy if exists "Products are publicly viewable" on public.products;
drop policy if exists "Admins can manage products" on public.products;

create policy "Products are publicly viewable"
on public.products
for select
to public
using (true);

create policy "Admins can manage products"
on public.products
for all
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
