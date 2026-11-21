import { useEffect, useRef, useState } from 'react'
import { MessageCircle, SendHorizontal, X } from 'lucide-react'
import { sendChat } from '../../services/api'
import { askLink } from '../../utils/whatsapp'

// Limits from Project Plan §4.5; the backend enforces them too.
const MAX_LENGTH = 500
const MESSAGE_GAP_MS = 3000
const HISTORY_LIMIT = 6

const aiBubble = 'max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-line bg-white px-3.5 py-2.5 leading-relaxed'
const userBubble = 'max-w-[85%] self-end rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 leading-relaxed text-white'

const WELCOME = { role: 'model', text: 'Halo! Ada yang bisa kami bantu seputar produk, harga, atau cara pesan?' }

export default function ChatBubble({ phone }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([WELCOME])
  const [loading, setLoading] = useState(false)
  const [coolingDown, setCoolingDown] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const cooldownTimer = useRef(null)
  const wa = askLink(phone)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => () => clearTimeout(cooldownTimer.current), [])

  function startCooldown() {
    setCoolingDown(true)
    cooldownTimer.current = setTimeout(() => setCoolingDown(false), MESSAGE_GAP_MS)
  }

  async function send(event) {
    event.preventDefault()
    const text = input.trim().slice(0, MAX_LENGTH)
    if (!text || loading || coolingDown) return

    const history = messages
      .filter((msg) => !msg.failed)
      .slice(-HISTORY_LIMIT)
      .map(({ role, text }) => ({ role, text }))
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setLoading(true)
    startCooldown()
    try {
      const { ok, data } = await sendChat(text, history)
      setMessages((prev) => [...prev, ok
        ? { role: 'model', text: data.answer }
        : { role: 'model', text: data.message || 'Maaf, asisten sedang tidak bisa menjawab.', failed: true }])
    } catch (err) {
      const reply = err.name === 'TimeoutError'
        ? 'Asisten terlalu lama menjawab. Coba lagi sebentar lagi, atau tanya langsung lewat WhatsApp.'
        : 'Gagal menghubungi asisten.'
      setMessages((prev) => [...prev, { role: 'model', text: reply, failed: true }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <section
          className="fixed inset-x-2 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-xl md:inset-x-auto md:right-6 md:bottom-24 md:w-96 md:max-h-[min(560px,calc(100dvh-8rem))]"
          role="dialog"
          aria-label="Asisten produk"
        >
          <header className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Asisten produk</p>
              <p className="text-xs text-white/60">Jawaban otomatis, bisa saja keliru</p>
            </div>
            <button className="grid size-8 cursor-pointer place-items-center rounded-full hover:bg-white/10" onClick={() => setOpen(false)} aria-label="Tutup chat">
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>
          <p className="border-b border-line bg-brand-soft/60 px-4 py-2 text-xs leading-snug text-ink/80">Jangan tuliskan data pribadi seperti alamat atau nomor rekening di sini.</p>
          <div className="flex min-h-48 flex-1 flex-col gap-2.5 overflow-y-auto p-4 text-sm" ref={bodyRef} aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? userBubble : aiBubble}>
                {msg.text}
                {msg.failed && wa && (
                  <a className="mt-2 flex items-center gap-1.5 font-semibold text-brand underline" href={wa} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" /> Tanya lewat WhatsApp
                  </a>
                )}
              </div>
            ))}
            {loading && <div className={`${aiBubble} text-muted`}>Mengetik…</div>}
          </div>
          <form className="flex gap-2 border-t border-line bg-white p-3" onSubmit={send}>
            <input
              ref={inputRef}
              className="h-11 flex-1 rounded-full border border-line bg-paper px-4 text-base outline-none focus:border-ink sm:text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_LENGTH}
              placeholder="Tanya soal produk..."
              aria-label="Pesan"
              disabled={loading}
            />
            <button
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
              type="submit"
              aria-label="Kirim"
              disabled={loading || coolingDown || !input.trim()}
            >
              <SendHorizontal className="size-5" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
      <button
        className={`fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex size-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink text-white shadow-lg transition-colors hover:bg-ink/90 ${open ? 'max-md:hidden' : ''} md:right-6 md:bottom-6 md:size-auto md:h-12 md:px-5`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Tutup asisten produk' : 'Buka asisten produk'}
        aria-expanded={open}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <MessageCircle className="size-5" aria-hidden="true" />}
        <span className="text-sm font-semibold max-md:hidden">{open ? 'Tutup' : 'Tanya asisten'}</span>
      </button>
    </>
  )
}
