# TAMA STORE — Next.js + Supabase

Website toko digital tema pink/neon mengikuti referensi gambar yang diberikan.

## Fitur
- Landing page responsif dengan branding Tama Store.
- Daftar layanan dan harga: pemulihan akun Rp40.000, Voice Chat/On Mic Rp30.000, region Rp40.000, age Rp40.000, aplikasi Rp100.000, bantuan pemulihan pemilik Rp50.000, konsultasi badge Rp100.000.
- Top up Robux dengan nominal yang dapat diedit di `lib/config.ts`.
- Pesanan layanan/Robux disimpan ke Supabase dan dilanjutkan ke WhatsApp untuk konfirmasi admin.
- Instruksi QRIS manual: QRIS dikirim admin setelah order dibuat. Tambahkan QRIS resmi milik toko di halaman topup bila ingin menampilkan QR secara langsung.
- Katalog akun dengan pencarian dan filter; listing dikelola dari admin.
- Pengajuan jual akun dikirim ke WhatsApp untuk review admin.
- Admin panel `/admin`: login Supabase Auth, melihat order, mengubah status, menambah listing, mengaktifkan/menyembunyikan listing.

## Catatan kebijakan & keamanan
- Tidak ada fitur mengambil akun orang lain, bypass verifikasi, meminta password, OTP, cookie, atau akses email.
- Pemulihan hanya untuk pemilik akun sah melalui jalur resmi Roblox.
- Roblox melarang penjualan/transfer akun. Karena itu listing akun Roblox diblokir di formulir dan katalog; katalog hanya untuk game yang mengizinkan transfer menurut ketentuan penerbitnya.
- Layanan badge hanya konsultasi/persiapan jalur resmi; tidak menjamin badge. Roblox yang menentukan badge.
- Jangan meminta atau menyimpan password/OTP pelanggan.

## 1. Siapkan Supabase
1. Buat project di Supabase.
2. Buka SQL Editor, jalankan `supabase/schema.sql`.
3. Di Authentication > Providers, aktifkan Email.
4. Di Authentication > Users, buat user admin secara manual.
5. Matikan public signups.
6. Salin Project URL dan anon public key dari Project Settings > API.

> Untuk penggunaan produksi dengan data pelanggan, perketat RLS: policy admin pada file SQL adalah baseline. Idealnya tambahkan tabel `profiles` dengan role admin dan policy yang memeriksa role tersebut.

## 2. Jalankan lokal
```bash
npm install
cp .env.example .env.local
```
Isi `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_ADMIN_EMAIL=admin@email.com
```
Lalu:
```bash
npm run dev
```
Buka http://localhost:3000.

## 3. Deploy GitHub + Vercel
1. Buat repository GitHub baru.
2. Upload seluruh isi folder project ini.
3. Import repository tersebut di Vercel.
4. Tambahkan tiga Environment Variables di Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
5. Deploy. Framework preset: Next.js. Build command: `npm run build`.
6. Setelah deploy, buka `/admin` untuk login.

Nomor WhatsApp CS sudah diatur di `lib/config.ts` menjadi `0895-3918-45923` (format link: `62895391845923`). Jika ingin mengubah, edit konstanta `WHATSAPP_NUMBER` dan `WHATSAPP_DISPLAY`.

## 4. Pembayaran QRIS
Template ini memakai alur QRIS manual agar admin memverifikasi nominal dan bukti pembayaran sebelum mengubah status order. Kirim QRIS resmi toko melalui CS setelah order dibuat. Jangan memakai QRIS contoh/placeholder sebagai tujuan transfer. Integrasi payment gateway otomatis memerlukan akun provider dan secret key server-side; jangan letakkan secret key di `NEXT_PUBLIC_*`.

## 5. Harga & produk
Edit daftar `services` dan `robuxPacks` di `lib/config.ts`. Harga Robux di template adalah contoh awal dan harus diperbarui sesuai harga jual/ketersediaan toko.
\n\n## Asset pembayaran dan identitas\n- Gambar kontak toko: `public/images/tama-store-contact.png`\n- Gambar QRIS: `public/images/tama-store-qris.png`\nGanti file tersebut jika ingin memperbarui gambar. Fitur cek username mengambil nama dan avatar publik melalui API Roblox.\n