export const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(price)

export const categoryName = (product) => product.kategori?.namaKategori || 'Produk'

// The catalogue sends flavours as [{ namaRasa }], chatbot cards as plain names.
export const flavourNames = (product) => (product.rasa || []).map((rasa) => (typeof rasa === 'string' ? rasa : rasa.namaRasa))
