// wa.me needs the country code, but owners usually type local numbers (0812...), so 0 becomes 62.
// Returns null without a number so callers hide the button instead of linking to a dummy number.
export function waLink(phone, message = '') {
  const number = String(phone ?? '').replace(/\D/g, '').replace(/^0/, '62')
  if (!number) return null
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export const orderLink = (phone, productName) => waLink(phone, `Halo, saya ingin memesan ${productName}`)
