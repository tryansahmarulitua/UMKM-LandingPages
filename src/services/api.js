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

// A little longer than the API's own 30 s wait for Gemini, so the API can still answer with its error message.
const CHAT_TIMEOUT_MS = 35_000

export async function sendChat(message, history, timeoutMs = CHAT_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new DOMException('Chat request timed out', 'TimeoutError')), timeoutMs)
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    })
    return { ok: response.ok, data: await response.json() }
  } finally {
    clearTimeout(timer)
  }
}

export const assetUrl = (path) => (path ? `${BASE_URL}/storage/${path}` : null)
