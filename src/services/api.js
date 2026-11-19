const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '')

async function request(path) {
  const response = await fetch(`${API_URL}/${path.replace(/^\/+/, '')}`)
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json()
}

export const getProducts = () => request('/public/produk')
export const getProfile = () => request('/public/profil')
export const assetUrl = (path) => path ? `${API_URL.replace(/\/api$/, '')}/storage/${path}` : null
