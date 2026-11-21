import { useEffect, useRef } from 'react'

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

export default function TurnstileWidget({ onToken }) {
  const containerRef = useRef(null)

  useEffect(() => {
    let widgetId
    const render = () => {
      if (!containerRef.current || !window.turnstile) return
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: onToken,
        'expired-callback': () => onToken(null),
        'error-callback': () => onToken(null),
      })
    }

    if (window.turnstile) render()
    else {
      const script = document.querySelector(`script[src="${SCRIPT_URL}"]`) || document.createElement('script')
      script.src = SCRIPT_URL
      script.async = true
      script.onload = render
      if (!script.parentNode) document.head.appendChild(script)
    }

    return () => {
      if (widgetId !== undefined) window.turnstile?.remove(widgetId)
    }
  }, [onToken])

  return <div ref={containerRef} className="min-h-[65px]" aria-label="Verifikasi keamanan" />
}
