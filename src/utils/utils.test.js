import { describe, expect, it } from 'vitest'
import { categoryName, flavourNames, formatPrice } from './formatters'
import { httpUrl, socialLabel } from './url'
import { askLink, orderLink, waLink } from './whatsapp'
import { business } from '../content'

describe('flavourNames', () => {
  it('reads flavour objects from the catalogue and plain names from chatbot cards', () => {
    expect(flavourNames({ rasa: [{ idRasa: 1, namaRasa: 'Manis' }, { idRasa: 4, namaRasa: 'Pedas' }] })).toEqual(['Manis', 'Pedas'])
    expect(flavourNames({ rasa: ['Gurih'] })).toEqual(['Gurih'])
  })

  it('returns an empty list when the product has no flavours', () => {
    expect(flavourNames({})).toEqual([])
  })
})

describe('waLink', () => {
  it('keeps only digits of the number and encodes the message', () => {
    expect(waLink('+62 812-3456', 'Halo & tanya')).toBe('https://wa.me/628123456?text=Halo%20%26%20tanya')
  })

  it('omits the text param when there is no message', () => {
    expect(waLink('6281234500000')).toBe('https://wa.me/6281234500000')
  })

  it.each(['081234500000', '0812-3450-0000', '+62 812 3450 0000', '6281234500000'])(
    'turns %s into an international number',
    (phone) => {
      expect(waLink(phone)).toBe('https://wa.me/6281234500000')
    },
  )

  it('returns null without a usable number so no dummy link is rendered', () => {
    expect(waLink(undefined)).toBeNull()
    expect(waLink('')).toBeNull()
    expect(waLink('abc')).toBeNull()
  })
})

describe('orderLink', () => {
  it('prefills the order message with the product name', () => {
    expect(orderLink('0812', 'Abon Sapi')).toBe('https://wa.me/62812?text=Halo%2C%20saya%20ingin%20memesan%20Abon%20Sapi')
  })

  it('returns null without a number', () => {
    expect(orderLink(null, 'Abon Sapi')).toBeNull()
  })
})

describe('httpUrl', () => {
  it.each(['https://instagram.com/bundariris_17new', 'http://contoh.id'])('accepts %s', (url) => {
    expect(httpUrl(url)).toBe(url)
  })

  it('trims surrounding whitespace', () => {
    expect(httpUrl('  https://contoh.id  ')).toBe('https://contoh.id')
  })

  it.each(['javascript:alert(1)', ' javascript:alert(1)', 'data:text/html,x', 'instagram.com/x', 'https://', 'https://exa mple.com', 'https://localhost', '', null, undefined])(
    'rejects %s',
    (url) => {
      expect(httpUrl(url)).toBeNull()
    },
  )
})

describe('formatters', () => {
  it('formats rupiah without decimals', () => {
    expect(formatPrice(45000).replace(/\s/g, ' ')).toBe('Rp 45.000')
  })

  it('falls back to a generic category name', () => {
    expect(categoryName({ kategori: { namaKategori: 'Abon' } })).toBe('Abon')
    expect(categoryName({ kategori: null })).toBe('Produk')
  })
})

describe('socialLabel', () => {
  it('shows an Instagram handle', () => {
    expect(socialLabel('https://www.instagram.com/bundariris_17new/')).toBe('@bundariris_17new')
  })

  it('falls back to the domain for other sites', () => {
    expect(socialLabel('https://tiktok.com/@bundariris')).toBe('tiktok.com')
  })
})

describe('askLink', () => {
  it('opens WhatsApp with the same greeting everywhere', () => {
    expect(askLink('0812')).toBe('https://wa.me/62812?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk')
  })
})

describe('business', () => {
  it('prefers the profile from the API', () => {
    expect(business({ namaUMKM: 'Bunda', alamat: 'Bekasi', deskripsi: 'Camilan' })).toEqual({ name: 'Bunda', area: 'Bekasi', description: 'Camilan' })
  })

  it('falls back to the static content when the profile is missing or empty', () => {
    const fallback = business(null)
    expect(fallback.name).toBe('Menu Sedap ala Bunda Riris')
    expect(business({ namaUMKM: '', alamat: null })).toEqual(fallback)
  })
})
