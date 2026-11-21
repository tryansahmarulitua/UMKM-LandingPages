# UMKM Bunda Riris — Website Publik

Frontend publik untuk **Menu Sedap ala Bunda Riris** (Jati Sampurna, Bekasi): beranda, katalog dan detail produk, profil usaha, dan widget chatbot. Data diambil dari REST API Laravel; aplikasi ini tidak menyimpan data sendiri.

Proyek PPPL — Creative Digital Squad.

## Kebutuhan

- Node.js 20+
- Backend Laravel yang berjalan (default `http://localhost:8000`)

## Menjalankan

```bash
npm install
cp .env.example .env   # sesuaikan VITE_API_URL
npm run dev
```

| Perintah          | Fungsi                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Server pengembangan Vite       |
| `npm run lint`    | ESLint                         |
| `npm test`        | Unit test util (Vitest)        |
| `npm run build`   | Build produksi ke `dist/`      |
| `npm run preview` | Menjalankan hasil build lokal  |

## Konfigurasi

| Variabel       | Contoh                      | Keterangan              |
| -------------- | --------------------------- | ----------------------- |
| `VITE_API_URL` | `http://localhost:8000/api` | Alamat REST API Laravel |

Semua variabel `VITE_*` ikut masuk ke bundle JavaScript dan bisa dibaca siapa pun. Jangan pernah menaruh kunci Gemini, secret Turnstile, atau password di sini; rahasia hanya disimpan di `.env` backend.

## Endpoint yang dipakai

| Metode | Path                 | Dipakai untuk               |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/public/produk` | Katalog produk              |
| GET    | `/api/public/profil` | Profil usaha, kontak, WA    |
| POST   | `/api/chat`          | Chatbot (`message`, `history`) |

Foto produk dan profil dibaca dari `<BASE_URL>/storage/<path>`.

## Struktur

```
src/
  pages/             halaman per route (Beranda, Produk, Detail, Tentang)
  components/
    layout/          Navbar, Footer, BottomTabBar
    sections/        bagian halaman (Hero, OrderSteps)
    ui/              ProductGrid, ProductCard, ProductModal, EmptyState, InstagramIcon
    chat/            ChatBubble
  hooks/             useLandingData (fetch produk + profil)
  services/api.js    semua pemanggilan API (+ test timeout chat)
  utils/             format harga, tautan WhatsApp, validasi URL (+ test)
  content.js         teks statis dan business(profile): nama, area, deskripsi dengan fallback
  index.css          Tailwind: token desain (@theme) dan class bersama
public/.htaccess     rewrite SPA untuk hosting Apache (InfinityFree)
vercel.json          rewrite SPA untuk Vercel
```

## Styling

Styling memakai Tailwind CSS v4. Warna dan font didefinisikan di `@theme` pada `src/index.css`. Layout ditulis mobile-first dengan breakpoint bawaan Tailwind:

- tanpa prefix: ponsel
- `sm:` ≥640px, `md:` ≥768px (tablet, navbar penuh, tab bar bawah disembunyikan), `lg:` ≥1024px (PC)

Ikon memakai `lucide-react`, kecuali logo Instagram (`InstagramIcon`, SVG sendiri) karena lucide tidak menyediakan logo merek. Pola yang dipakai di banyak tempat (`wrapper`, `btn`, `btn-primary`, `btn-outline`, `skeleton`) ada di `@layer components`. Sisanya ditulis sebagai utility langsung di komponen.

## Deployment

`npm run build` menghasilkan `dist/`. Folder itu bisa diunggah ke hosting Apache (InfinityFree, PP §9): `public/.htaccess` ikut tersalin dan mengarahkan route seperti `/produk/3` ke `index.html`. `vercel.json` melakukan hal yang sama bila deploy ke Vercel.
