import { BadgeCheck, ChefHat, ShieldCheck } from 'lucide-react'

const BUSINESS_NAME = 'Menu Sedap ala Bunda Riris'
const BUSINESS_AREA = 'Jati Sampurna, Bekasi'
const BUSINESS_DESCRIPTION = 'Abon, keripik, kue kering, dan camilan rumahan yang dibuat sendiri di dapur kami.'

// Business details from /public/profil, with static fallbacks while it is loading, empty, or unreachable.
export const business = (profile) => ({
  name: profile?.namaUMKM || BUSINESS_NAME,
  area: profile?.alamat || BUSINESS_AREA,
  description: profile?.deskripsi || BUSINESS_DESCRIPTION,
})

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

// Ordering flow from Project Plan §1.1.
export const ORDER_STEPS = [
  { title: 'Masukkan ke keranjang', text: 'Pilih camilan di katalog, lalu tekan + Keranjang.' },
  { title: 'Checkout tanpa akun', text: 'Isi nama, nomor WhatsApp, dan pilih ambil sendiri atau dikirim. Kamu dapat nomor pesanan.' },
  { title: 'Transfer dan kirim bukti', text: 'Transfer sesuai total, lalu kirim bukti lewat WhatsApp. Ongkir dikonfirmasi di sana.' },
]
