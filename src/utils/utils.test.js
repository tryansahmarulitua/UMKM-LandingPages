import { describe, expect, it } from 'vitest'
import { categoryName, formatPrice } from './formatters'
import { httpUrl } from './url'
import { orderLink, waLink } from './whatsapp'

describe('waLink', () => {
  it('keeps only digits of the number and encodes the message', () => {
    expect(waLink('+62 812-3456', 'Halo & tanya')).toBe('https://wa.me/628123456?text=Halo%20%26%20tanya')
  })

  it('omits the text param when there is no message', () => {
    expect(waLink('0812')).toBe('https://wa.me/0812')
  })

  it('returns null without a usable number so no dummy link is rendered', () => {
    expect(waLink(undefined)).toBeNull()
    expect(waLink('')).toBeNull()
    expect(waLink('abc')).toBeNull()
  })
})

describe('orderLink', () => {
  it('prefills the order message with the product name', () => {
    expect(orderLink('0812', 'Abon Sapi')).toBe('https://wa.me/0812?text=Halo%2C%20saya%20ingin%20memesan%20Abon%20Sapi')
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

  it.each(['javascript:alert(1)', ' javascript:alert(1)', 'data:text/html,x', 'instagram.com/x', '', null, undefined])(
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
