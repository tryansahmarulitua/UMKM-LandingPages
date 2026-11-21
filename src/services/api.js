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

// verifikasi: { tiket } after the first answer, or { turnstile } for the first message.
export async function sendChat(message, history, verifikasi = {}, timeoutMs = CHAT_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new DOMException('Chat request timed out', 'TimeoutError')), timeoutMs)
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, ...verifikasi }),
      signal: controller.signal,
    })
    return { ok: response.ok, data: await response.json() }
  } finally {
    clearTimeout(timer)
  }
}

// Checkout. Returns the status and body, so validation messages from the API can be shown.
export async function createOrder(order) {
  const response = await fetch(`${API_URL}/pesanan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(order),
  })
  return { ok: response.ok, status: response.status, data: await response.json() }
}

export const assetUrl = (path) => (path ? `${BASE_URL}/storage/${path}` : null)
