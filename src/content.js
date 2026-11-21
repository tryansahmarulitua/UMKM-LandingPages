import { BadgeCheck, ChefHat, ShieldCheck } from 'lucide-react'

// Shown when the API is unreachable; real values come from /public/profil.
export const BUSINESS_NAME = 'Menu Sedap ala Bunda Riris'
export const BUSINESS_AREA = 'Jati Sampurna, Bekasi'
export const BUSINESS_DESCRIPTION = 'Abon, keripik, kue kering, dan camilan rumahan yang dibuat sendiri di dapur kami.'

export const PRODUCTS_UNAVAILABLE = 'Produk belum bisa dimuat. Coba muat ulang halaman sebentar lagi.'

export const NAV_ITEMS = [
  { to: '/', label: 'Beranda' },
  { to: '/produk', label: 'Katalog' },
  { to: '/tentang', label: 'Tentang' },
]

// Facts from the client profile in Project Plan §1.7 (NIB and Halal certificate).
export const FACTS = [
  { icon: ShieldCheck, label: 'Bersertifikat Halal' },
  { icon: BadgeCheck, label: 'Terdaftar NIB' },
  { icon: ChefHat, label: 'Dibuat di dapur rumahan' },
]

// Mirrors the manual ordering flow in Project Plan §1.1; update when online checkout ships.
export const ORDER_STEPS = [
  { title: 'Pilih produk', text: 'Lihat katalog dan pilih camilan yang kamu mau.' },
  { title: 'Pesan lewat WhatsApp', text: 'Tekan tombol Pesan. WhatsApp terbuka dengan pesan yang sudah terisi.' },
  { title: 'Bayar dan terima', text: 'Bayar lewat transfer, lalu ambil sendiri atau dikirim. Ongkir dikonfirmasi di WhatsApp.' },
]
