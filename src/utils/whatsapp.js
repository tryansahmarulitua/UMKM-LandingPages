// Returns null without a number so callers hide the button instead of linking to a dummy number.
export function waLink(phone, message = '') {
  const number = phone?.replace(/\D/g, '')
  if (!number) return null
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export const orderLink = (phone, productName) => waLink(phone, `Halo, saya ingin memesan ${productName}`)
