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

  it('sends the Turnstile token or chat ticket along with the message', async () => {
    const fetchMock = vi.fn(async () => new Response('{}', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    await sendChat('halo', [], { tiket: 'abc' })
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ message: 'halo', history: [], tiket: 'abc' })
  })

  it('gives up with a TimeoutError instead of leaving "Mengetik..." forever', async () => {
    vi.stubGlobal('fetch', hangingFetch)
    await expect(sendChat('halo', [], {}, 20)).rejects.toMatchObject({ name: 'TimeoutError' })
  })
})
