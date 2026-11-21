// Links from the API end up in href, so anything other than http(s) (e.g. javascript:) is dropped.
export function httpUrl(url) {
  const value = url?.trim()
  return value && /^https?:\/\//i.test(value) ? value : null
}

// Short label for a social link: "@handle" for Instagram, otherwise the bare domain.
export function socialLabel(url) {
  const { hostname, pathname } = new URL(url)
  const host = hostname.replace(/^www\./, '')
  const handle = pathname.split('/').find(Boolean)
  return host === 'instagram.com' && handle ? `@${handle}` : host
}
