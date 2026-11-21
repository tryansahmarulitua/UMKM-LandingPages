import { formatPrice } from './formatters'

// Same limits as the API (PesananController).
export const MAKS_JUMLAH = 50
export const MAKS_PRODUK = 20

// The cart only stores { idProduk, jumlah }; names and prices always come from the latest catalogue.
const batasi = (jumlah) => Math.min(MAKS_JUMLAH, Math.max(0, Math.floor(Number(jumlah) || 0)))

export function tambahItem(items, idProduk, jumlah = 1) {
  const ada = items.find((item) => item.idProduk === idProduk)
  if (ada) return ubahJumlah(items, idProduk, ada.jumlah + jumlah)
  if (items.length >= MAKS_PRODUK) return items
  return [...items, { idProduk, jumlah: Math.max(1, batasi(jumlah)) }]
}

// A quantity below 1 removes the product.
export function ubahJumlah(items, idProduk, jumlah) {
  const baru = batasi(jumlah)
  return baru < 1
    ? items.filter((item) => item.idProduk !== idProduk)
    : items.map((item) => (item.idProduk === idProduk ? { ...item, jumlah: baru } : item))
}

// Cart rows with the current catalogue data. Products no longer in the catalogue are left out.
export function rincianKeranjang(items, products) {
  const katalog = new Map(products.map((product) => [product.idProduk, product]))
  const baris = items
    .filter((item) => katalog.has(item.idProduk))
    .map((item) => {
      const product = katalog.get(item.idProduk)
      return { product, jumlah: item.jumlah, subtotal: Number(product.harga) * item.jumlah }
    })
  return { baris, total: baris.reduce((sum, row) => sum + row.subtotal, 0) }
}

// Reads a saved cart defensively: anything malformed is dropped.
export function bacaKeranjang(teks) {
  try {
    const data = JSON.parse(teks ?? '[]')
    if (!Array.isArray(data)) return []
    return data
      .filter((item) => Number.isInteger(item?.idProduk) && Number.isInteger(item?.jumlah) && item.jumlah >= 1)
      .map((item) => ({ idProduk: item.idProduk, jumlah: batasi(item.jumlah) }))
      .slice(0, MAKS_PRODUK)
  } catch {
    return []
  }
}

// Same rule as the API: an Indonesian mobile number (08... / 628... / +628...), spaces and dashes allowed.
export const nomorWhatsAppValid = (nomor) => /^(\+62|62|0)[\s-]?8[1-9][0-9\s-]{6,14}$/.test(String(nomor ?? '').trim())

// Message the customer sends to the owner after checkout (Project Plan §1.1).
export function pesanWhatsApp(pesanan) {
  const baris = [
    `Halo, saya mau konfirmasi pesanan ${pesanan.nomorPesanan}.`,
    `Nama: ${pesanan.namaPelanggan}`,
    `Pengiriman: ${pesanan.pengiriman}`,
    '',
    ...pesanan.items.map((item) => `- ${item.namaProduk} x${item.jumlah} = ${formatPrice(item.subtotal)}`),
    `Total: ${formatPrice(pesanan.total)}`,
  ]
  if (pesanan.pengiriman === 'Dikirim') baris.push('', 'Alamat pengiriman: ', 'Mohon info ongkos kirimnya.')
  baris.push('', 'Bukti transfer saya kirim di sini.')
  return baris.join('\n')
}
