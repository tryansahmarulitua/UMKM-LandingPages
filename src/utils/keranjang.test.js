import { describe, expect, it } from 'vitest'
import { bacaKeranjang, MAKS_JUMLAH, MAKS_PRODUK, nomorWhatsAppValid, pesanWhatsApp, rincianKeranjang, tambahItem, ubahJumlah } from './keranjang'

describe('tambahItem', () => {
  it('adds a new product or increases the quantity of one already in the cart', () => {
    let items = tambahItem([], 1)
    items = tambahItem(items, 2, 3)
    items = tambahItem(items, 1)
    expect(items).toEqual([{ idProduk: 1, jumlah: 2 }, { idProduk: 2, jumlah: 3 }])
  })

  it('stops at the same limits as the API', () => {
    expect(tambahItem([{ idProduk: 1, jumlah: MAKS_JUMLAH }], 1)).toEqual([{ idProduk: 1, jumlah: MAKS_JUMLAH }])
    const penuh = Array.from({ length: MAKS_PRODUK }, (_, i) => ({ idProduk: i + 1, jumlah: 1 }))
    expect(tambahItem(penuh, 999)).toBe(penuh)
  })
})

describe('ubahJumlah', () => {
  it('sets the quantity, capped at the maximum', () => {
    expect(ubahJumlah([{ idProduk: 1, jumlah: 1 }], 1, 4)).toEqual([{ idProduk: 1, jumlah: 4 }])
    expect(ubahJumlah([{ idProduk: 1, jumlah: 1 }], 1, 80)).toEqual([{ idProduk: 1, jumlah: MAKS_JUMLAH }])
  })

  it('removes the product when the quantity drops below 1', () => {
    expect(ubahJumlah([{ idProduk: 1, jumlah: 1 }, { idProduk: 2, jumlah: 1 }], 1, 0)).toEqual([{ idProduk: 2, jumlah: 1 }])
  })
})

describe('rincianKeranjang', () => {
  it('uses current catalogue prices and leaves out products no longer listed', () => {
    const products = [{ idProduk: 1, namaProduk: 'Abon', harga: '45000.00' }, { idProduk: 2, namaProduk: 'Keripik', harga: '12500.50' }]
    const { baris, total } = rincianKeranjang([{ idProduk: 1, jumlah: 2 }, { idProduk: 2, jumlah: 3 }, { idProduk: 9, jumlah: 1 }], products)

    expect(baris.map((row) => [row.product.namaProduk, row.subtotal])).toEqual([['Abon', 90000], ['Keripik', 37501.5]])
    expect(total).toBe(127501.5)
  })
})

describe('bacaKeranjang', () => {
  it('reads a saved cart and drops anything malformed', () => {
    expect(bacaKeranjang('[{"idProduk":1,"jumlah":2},{"idProduk":"x","jumlah":1},{"idProduk":3,"jumlah":0},{"idProduk":4,"jumlah":99}]'))
      .toEqual([{ idProduk: 1, jumlah: 2 }, { idProduk: 4, jumlah: MAKS_JUMLAH }])
    expect(bacaKeranjang('bukan json')).toEqual([])
    expect(bacaKeranjang('{"a":1}')).toEqual([])
    expect(bacaKeranjang(null)).toEqual([])
  })
})

describe('nomorWhatsAppValid', () => {
  it.each(['081234567890', '0812-3456-7890', '+62 812 3456 7890', '6281234567890', '0812-3456-7890-12'])('accepts %s', (nomor) => {
    expect(nomorWhatsAppValid(nomor)).toBe(true)
  })

  // The last two would be 16 digits once the API stores them as 62..., one more than its column holds.
  it.each(['12345', '0212345678', '08', '', '6281234567890123', '0812-3456-7890-123'])('rejects %s', (nomor) => {
    expect(nomorWhatsAppValid(nomor)).toBe(false)
  })
})

describe('pesanWhatsApp', () => {
  const pesanan = {
    nomorPesanan: 'BR-20261121-0007',
    namaPelanggan: 'Rina',
    pengiriman: 'Ambil sendiri',
    total: 90000,
    items: [{ namaProduk: 'Abon Sapi', jumlah: 2, subtotal: 90000 }],
  }

  it('contains the order number, items and total', () => {
    const teks = pesanWhatsApp(pesanan)
    expect(teks).toContain('pesanan BR-20261121-0007')
    expect(teks).toContain('- Abon Sapi x2 = Rp')
    expect(teks).toContain('Total: Rp')
    expect(teks).not.toContain('Alamat pengiriman')
  })

  it('asks for the address and shipping cost when the order is delivered', () => {
    const teks = pesanWhatsApp({ ...pesanan, pengiriman: 'Dikirim' })
    expect(teks).toContain('Alamat pengiriman: ')
    expect(teks).toContain('ongkos kirim')
  })
})
