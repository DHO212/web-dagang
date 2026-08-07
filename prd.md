# 📋 Product Requirement Document (PRD) — E-Commerce Web App

## 1. Project Overview
Aplikasi web e-commerce B2C yang modern, responsive, dan cepat.
Aplikasi ini memungkinkan pembeli untuk menjelajahi katalog produk, mencari/memfilter barang, mengelola keranjang belanja, serta melakukan checkout transaksi.

---

## 2. Tech Stack & Engineering Standards
- **Framework:** Next.js (App Router), TypeScript
- **Styling UI:** Tailwind CSS, Shadcn UI / Radix UI, Lucide Icons
- **Database & ORM:** PostgreSQL, Prisma ORM
- **State Management:** Zustand (Persist to LocalStorage)
- **Validation:** Zod
- **Coding Rules:**
  - Strict TypeScript (Dilarang keras menggunakan tipe `any`).
  - Gunakan Server Actions / Route Handlers untuk operasi data backend.
  - Penanganan error wajib menggunakan blok `try/catch` dan menampilkan UI toast notification yang ramah pengguna.
  - Tulis kode yang modular, bersih, dan memisahkan logika UI dengan logika data.

---

## 3. User Roles & Access
1. **Guest / Customer:**
   - Melihat katalog produk, menggunakan fitur search & filter.
   - Mengatur keranjang belanja (Tambah, Kurang, Hapus, Ubah Kuantitas).
   - Mengisi form pengiriman dan melakukan simulasi checkout.
2. **Admin:**
   - Memiliki akses ke halaman dashboard sederhana untuk manajemen produk (CRUD).

---

## 4. Feature Specifications & Logic Flow

### 4.1. Navigation & Header (`Navbar`)
- Komponen: Logo, Input Search (dengan debounce 300ms), Filter Kategori, Icon Cart dengan Badge Total Item, dan Profile.
- Responsif: Tampilan ringkas dengan Hamburger Menu pada layar mobile.

### 4.2. Product Catalog & Listing
- Layout: Grid 4-kolom (Desktop), 2-kolom (Tablet), 1-kolom (Mobile).
- Komponen `ProductCard`:
  - Gambar produk (AspectRatio 1:1). Gunakan URL `https://placehold.co/400x400/png?text=Product` jika gambar belum ada.
  - Badge Diskon/Stok jika tersedia.
  - Judul Produk (Truncate max 2 baris).
  - Rating Bintang (misal: ★ 4.8).
  - Harga dengan format Rupiah (contoh: `Rp 150.000`).
  - Tombol "+ Keranjang".

### 4.3. Shopping Cart (Keranjang Belanja)
- Komponen: `CartDrawer` (Slide-over dari kanan) & Halaman Detail Keranjang (`/cart`).
- Logika Zustand Store (`useCartStore`):
  - Fitur: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
  - Simpan state secara otomatis ke `localStorage`.
  - Kalkulasi Subtotal, Pajak/Estimasi Ongkir, dan Total Akhir secara otomatis.

### 4.4. Checkout Flow (`/checkout`)
- Form Informasi Pengiriman: Nama Lengkap, Email, No. Telepon, Alamat Lengkap, Kota, Kode Pos.
- Validasi Form menggunakan `Zod`.
- Ringkasan Pesanan (Order Summary): Daftar barang, total biaya, dan pilihan metode pembayaran dummy.
- Aksi: Membuat record pesanan baru di database dengan status `PENDING` saat tombol "Bayar Sekarang" diklik.

---

## 5. Database Schema Blueprint (Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  COMPLETED
  CANCELLED
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      Role     @default(CUSTOMER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
}

model Category {
  id       String    @id @default(uuid())
  name     String
  slug     String    @unique
  products Product[]
}

model Product {
  id          String      @id @default(uuid())
  name        String
  slug        String      @unique
  description String?
  price       Float
  stock       Int         @default(0)
  images      String[]
  categoryId  String
  category    Category    @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Order {
  id              String      @id @default(uuid())
  userId          String?
  user            User?       @relation(fields: [userId], references: [id])
  customerName    String
  customerEmail   String
  shippingAddress String
  totalAmount     Float
  status          OrderStatus @default(PENDING)
  orderItems      OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
}