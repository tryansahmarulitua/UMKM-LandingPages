// Links from the API end up in href, so anything other than http(s) (e.g. javascript:) is dropped.
export function httpUrl(url) {
  const value = url?.trim()
  return value && /^https?:\/\//i.test(value) ? value : null
}
