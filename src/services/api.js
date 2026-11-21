const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')
const API_URL = `${BASE_URL}/api`

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options)
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json()
}

export const getProducts = () => request('/public/produk')
export const getProfile = () => request('/public/profil')

export function sendChat(message, history) {
  return fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
}

export const assetUrl = (path) => (path ? `${BASE_URL}/storage/${path}` : null)
