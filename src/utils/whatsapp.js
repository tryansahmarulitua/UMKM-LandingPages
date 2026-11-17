const WA_NUMBER = '6281234567890'
export const waLink = (message = '') => `https://wa.me/${WA_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`
