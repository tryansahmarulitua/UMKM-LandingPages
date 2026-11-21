export const BUSINESS_NAME = 'Menu Sedap ala Bunda Riris'

export const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(price)

export const categoryName = (product) => product.kategori?.namaKategori || 'Produk'
