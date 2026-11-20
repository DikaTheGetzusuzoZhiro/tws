-- Jalankan di Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique default ('TAMA-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  kind text not null check (kind in ('service','robux')),
  item_id text not null,
  item_name text not null,
  price integer not null check (price > 0),
  username text not null,
  customer_contact text not null,
  note text default '',
  status text not null default 'pending' check (status in ('pending','waiting_payment','paid','processing','completed','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Pengunjung boleh membuat pesanan, tetapi tidak boleh membaca semua data pelanggan.
create policy "public can create orders" on public.orders
for insert to anon, authenticated with check (true);

-- Admin yang login boleh membaca dan mengubah pesanan.
create policy "authenticated admin read orders" on public.orders
for select to authenticated using (true);
create policy "authenticated admin update orders" on public.orders
for update to authenticated using (true) with check (true);

-- Katalog aktif bisa dibaca publik.
for select to anon, authenticated using (status = 'active');
for all to authenticated using (true) with check (true);

-- PENTING:
-- Buat akun admin manual di Supabase Dashboard > Authentication > Users.
-- Matikan signups publik. Batasi akun admin yang dapat login.
-- Untuk keamanan produksi, ganti policy authenticated di atas dengan validasi role/admin
-- melalui tabel profiles atau JWT claim; jangan berikan akun admin ke pihak lain.
