# 🎯 Development Task Checklist

Gunakan checklist ini untuk mengeksekusi proyek secara bertahap. Tandai `[x]` untuk tugas yang sudah selesai.

## Phase 1: Environment Setup & Database
- [x] Initialize Next.js app dengan TypeScript, Tailwind CSS, dan App Router.
- [x] Setup Prisma ORM dan buat file `prisma/schema.prisma` berdasarkan acuan di `PRD.md`.
- [x] Buat file `prisma/seed.ts` untuk mengisi database awal (5 Kategori & 12 Produk Dummy dengan URL image placeholder).
- [x] Jalankan migrasi Prisma dan execute seed script.

## Phase 2: UI Foundation & Components
- [x] Install & Setup Shadcn UI / Lucide Icons.
- [x] Buat komponen `Navbar` lengkap dengan Search Input dan Cart Trigger.
- [x] Buat komponen `Footer`.
- [x] Buat komponen `ProductCard` yang menampilkan data produk secara dinamis.
- [x] Buat komponen `ProductGrid` yang responsive.

## Phase 3: State Management & Shopping Cart
- [x] Install Zustand dan buat store `useCartStore` di `@/store/useCartStore.ts`.
- [x] Implementasikan fitur `addToCart`, `removeFromCart`, dan `updateQuantity` dengan persistence ke LocalStorage.
- [x] Buat komponen `CartDrawer` (Slide-over) yang menampilkan daftar keranjang belanja real-time.

## Phase 4: Pages & Dynamic Routing
- [x] Halaman Beranda (`/`): Tampilkan Banner Hero, Filter Kategori, dan `ProductGrid`.
- [x] Halaman Detail Produk (`/product/[slug]`): Tampilkan galeri gambar, deskripsi, stok, dan tombol tambah ke keranjang.
- [x] Halaman Keranjang (`/cart`): Halaman khusus manajemen keranjang belanja secara rinci.

## Phase 5: Checkout & Order Handling
- [x] Halaman Checkout (`/checkout`): Buat form pengiriman menggunakan React Hook Form & Zod validation.
- [x] Buat Server Action `createOrder` untuk menyimpan data pesanan ke database PostgreSQL.
- [x] Halaman Sukses Pesanan (`/order-success/[id]`): Tampilkan rincian pesanan dan status transaksi.

## Phase 6: Refactoring & Testing
- [x] Lakukan pengecekan error TypeScript (`npm run build`).
- [x] Pastikan tampilan 100% responsive di ukuran Mobile, Tablet, dan Desktop.
- [x] Buat error boundary dan loading state (`loading.tsx`) untuk setiap halaman utama.