/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from 'react'

// Cloudflare Turnstile (Project Plan §4.5). During development Cloudflare's test key is used, which
// always passes; in production VITE_TURNSTILE_SITE_KEY must be set.
export const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? '1x00000000000000000000AA' : '')

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let memuat = null

function muatTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  memuat ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT
    script.async = true
    script.onload = () => resolve(window.turnstile)
    script.onerror = () => {
      memuat = null
      reject(new Error('Turnstile gagal dimuat'))
    }
    document.head.appendChild(script)
  })
  return memuat
}

// Calls onToken with a fresh token, or with null when it expires or fails. A token works only once:
// give the component a new `key` after using it to get another one.
export default function Turnstile({ onToken, className = '' }) {
  const box = useRef(null)
  const callback = useRef(onToken)

  useEffect(() => {
    callback.current = onToken
  }, [onToken])

  useEffect(() => {
    if (!SITE_KEY) return undefined
    let widgetId = null
    let aktif = true
    muatTurnstile()
      .then((turnstile) => {
        if (!aktif || !box.current) return
        widgetId = turnstile.render(box.current, {
          sitekey: SITE_KEY,
          language: 'id',
          size: 'flexible',
          callback: (token) => callback.current(token),
          'expired-callback': () => callback.current(null),
          'error-callback': () => callback.current(null),
        })
      })
      .catch(() => callback.current(null))
    return () => {
      aktif = false
      if (widgetId !== null) window.turnstile?.remove(widgetId)
    }
  }, [])

  if (!SITE_KEY) return <p className={`text-xs text-brand-dark ${className}`}>Verifikasi keamanan belum disiapkan. Silakan pesan atau bertanya lewat WhatsApp.</p>
  return <div ref={box} className={`min-h-[65px] ${className}`} />
}
