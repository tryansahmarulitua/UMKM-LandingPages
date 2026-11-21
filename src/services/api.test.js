import { afterEach, describe, expect, it, vi } from 'vitest'
import { sendChat } from './api'

const hangingFetch = (_url, { signal }) => new Promise((_resolve, reject) => {
  signal.addEventListener('abort', () => reject(signal.reason))
})

describe('sendChat', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns the status and parsed body', async () => {
    vi.stubGlobal('fetch', async () => new Response(JSON.stringify({ answer: 'Halo!' }), { status: 200 }))
    await expect(sendChat('halo', [])).resolves.toEqual({ ok: true, data: { answer: 'Halo!' } })
  })

  it('gives up with a TimeoutError instead of leaving "Mengetik..." forever', async () => {
    vi.stubGlobal('fetch', hangingFetch)
    await expect(sendChat('halo', [], 20)).rejects.toMatchObject({ name: 'TimeoutError' })
  })
})
