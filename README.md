# UMKM Bunda Riris — Website Publik

Frontend publik untuk **Menu Sedap ala Bunda Riris** (Jati Sampurna, Bekasi): beranda, katalog dan detail produk, keranjang dan checkout tanpa akun, profil usaha, dan widget chatbot. Data diambil dari REST API Laravel; aplikasi ini tidak menyimpan data sendiri.

Proyek PPPL — Creative Digital Squad.

## Kebutuhan

- Node.js 20.19+ atau 22.12+ (CI memakai Node 24)
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
| `npm test`        | Unit test (Vitest)             |
| `npm run build`   | Build produksi ke `dist/`      |
| `npm run preview` | Menjalankan hasil build lokal  |

## Konfigurasi

| Variabel       | Contoh                      | Keterangan              |
| -------------- | --------------------------- | ----------------------- |
| `VITE_API_URL` | `http://localhost:8000/api` | Alamat REST API Laravel |

Semua variabel `VITE_*` ikut masuk ke bundle JavaScript dan bisa dibaca siapa pun. Jangan pernah menaruh kunci Gemini atau password di sini; rahasia hanya disimpan di `.env` backend.

## Endpoint yang dipakai

| Metode | Path                 | Dipakai untuk               |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/public/produk` | Katalog produk              |
| GET    | `/api/public/profil` | Profil usaha, kontak, WA    |
| POST   | `/api/pesanan`       | Checkout (`namaPelanggan`, `noWhatsApp`, `pengiriman`, `items`) |
| POST   | `/api/chat`          | Chatbot (`message`, `history`) |

Foto produk dan profil dibaca dari `<BASE_URL>/storage/<path>`.

## Pemesanan

Pembeli menekan **+ Keranjang** di produk, lalu checkout di halaman `/keranjang` tanpa akun (nama, nomor WhatsApp, ambil sendiri/dikirim).

- Keranjang tersimpan di `localStorage` dan hanya berisi ID produk dan jumlah. Nama dan harga selalu diambil dari katalog terbaru, dan produk yang sudah tidak tampil otomatis hilang dari keranjang.
- Saat checkout, hanya ID dan jumlah yang dikirim. Harga, total, dan nomor pesanan dihitung API.
- Setelah checkout, pembeli melihat nomor pesanan, ringkasan, rekening tujuan dari Pengaturan, dan tombol **Kirim ke WhatsApp** berisi pesan siap kirim. Untuk pesanan yang dikirim, pesan itu memuat baris alamat dan permintaan info ongkir. Halaman konfirmasi tetap ada kalau tab dimuat ulang (`sessionStorage`).
- Batas jumlah sama dengan API: 1–50 per produk, maksimal 20 produk.

Chatbot menjawab berdasarkan produk yang ditampilkan dan profil usaha. Jawaban berupa teks biasa, dan baris barunya ditampilkan apa adanya di bubble chat. Kalau pengunjung menanyakan rasa atau minta saran, produk yang direkomendasikan tampil sebagai kartu (foto, nama, harga, rasa) di bawah jawaban; datanya dari database, bukan dari AI. Kartu membuka halaman detail produk. Label rasa juga tampil di kartu katalog, modal, dan detail produk. Kalau asisten gagal atau batas harian habis, pengunjung diarahkan ke WhatsApp.

## Struktur

```
src/
  pages/             halaman per route (Beranda, Produk, Detail, Tentang, Keranjang)
  components/
    layout/          Navbar, Footer, BottomTabBar
    sections/        bagian halaman (Hero, OrderSteps)
    ui/              ProductGrid, ProductCard, ProductModal, AddToCartButton, FlavourTags, EmptyState, InstagramIcon
    order/           PesananBerhasil (konfirmasi setelah checkout)
    chat/            ChatBubble, ChatProductCard
  hooks/             useLandingData (fetch produk + profil), useKeranjang (isi keranjang)
  services/api.js    semua pemanggilan API (+ test timeout chat)
  utils/             format harga, tautan WhatsApp, validasi URL, logika keranjang dan pesan WhatsApp (+ test)
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

## Deploy

Produksi ada di Vercel (`umkm-bundariris.vercel.app`) dan otomatis deploy setiap ada push ke `main`. `VITE_API_URL` untuk produksi diatur di **Settings → Environment Variables** project Vercel. `vercel.json` mengarahkan route seperti `/produk/3` ke `index.html`. Domain landing page juga harus terdaftar di `config/cors.php` UMKM-API.

Cadangan: `npm run build` menghasilkan `dist/` yang bisa diunggah ke hosting Apache (InfinityFree, PP §9). `public/.htaccess` ikut tersalin dan melakukan rewrite yang sama.

## Pengecekan otomatis

GitHub Actions (`.github/workflows/ci.yml`) menjalankan `npm ci`, `npm run lint`, `npm test`, dan `npm run build` di setiap PR dan setiap push ke `main`. Merge PR sebaiknya menunggu tanda hijau di tab **Checks**.
