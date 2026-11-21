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
    sections/        bagian beranda (Hero, ProductSlider)
    ui/              ProductCard, ProductModal, LoadingState
    chat/            ChatBubble
  hooks/             useLandingData (fetch produk + profil)
  services/api.js    semua pemanggilan API
  utils/             format harga, tautan WhatsApp
  styles/            base, pages, responsive (diimpor dari index.css)
```
