// Links from the API end up in href, so only parseable http(s) URLs pass (no javascript:, no "https://").
export function httpUrl(url) {
  const value = url?.trim()
  if (!value) return null
  try {
    const { protocol, hostname } = new URL(value)
    return /^https?:$/.test(protocol) && hostname.includes('.') ? value : null
  } catch {
    return null
  }
}

// Short label for a social link: "@handle" for Instagram, otherwise the bare domain. Expects httpUrl() output.
export function socialLabel(url) {
  const { hostname, pathname } = new URL(url)
  const host = hostname.replace(/^www\./, '')
  const handle = pathname.split('/').find(Boolean)
  return host === 'instagram.com' && handle ? `@${handle}` : host
}
