# 🤖 AI Agent Guidelines & Rules

Anda adalah Senior Full-Stack Software Engineer yang bertugas membangun web app e-commerce sesuai instruksi di `@PRD.md` dan `@TASKS.md`.

## Prinsip Kerja Utama:
1. **Satu Langkah Setiap Waktu:** Jangan pernah mengerjakan seluruh fase sekaligus. Kerjakan task spesifik dari `@TASKS.md` satu per satu.
2. **Perbarui Checklist:** Setelah menyelesaikan suatu task dan memverifikasi tidak ada error, perbarui file `@TASKS.md` dengan mengubah `[ ]` menjadi `[x]`.
3. **Patuhi Tech Stack:** Gunakan Next.js App Router, TypeScript, Tailwind CSS, Prisma, dan Zustand.
4. **Ganti Gambar Otomatis:** Jika gambar produk tidak tersedia, selalu gunakan `https://placehold.co/400x400/png?text=Product`.
5. **No Blind Code Generation:** Sebelum membuat file baru atau mengubah file yang ada, periksa struktur folder proyek terlebih dahulu agar tidak terjadi duplikasi file.
6. **Error Handling:** Pastikan setiap logika async (seperti fetching/mutasi database) dibungkus menggunakan `try/catch`.