import { useEffect, useRef, useState } from 'react'
import { sendChat } from '../../services/api'
import { waLink } from '../../utils/whatsapp'

// Limits from Project Plan §4.5; the backend enforces them too.
const MAX_LENGTH = 500
const MESSAGE_GAP_MS = 3000

const aiBubble = 'max-w-[80%] self-start rounded-[12px_12px_12px_4px] border border-line bg-white px-[13px] py-2.5'
const userBubble = 'max-w-[80%] self-end rounded-[12px_12px_4px_12px] bg-ink px-[13px] py-2.5 text-white'

const WELCOME = { role: 'model', text: 'Halo! Ada yang bisa kami bantu seputar produk atau info UMKM kami? 😊' }

export default function ChatBubble({ phone }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([WELCOME])
  const [loading, setLoading] = useState(false)
  const [coolingDown, setCoolingDown] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const cooldownTimer = useRef(null)
  const wa = waLink(phone, 'Halo, saya ingin bertanya tentang produk')

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
      .slice(-10)
      .map(({ role, text }) => ({ role, text }))
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setLoading(true)
    startCooldown()
    try {
      const res = await sendChat(text, history)
      const data = await res.json()
      setMessages((prev) => [...prev, res.ok
        ? { role: 'model', text: data.answer }
        : { role: 'model', text: data.message || 'Maaf, asisten sedang tidak bisa menjawab.', failed: true }])
    } catch {
      setMessages((prev) => [...prev, { role: 'model', text: 'Gagal menghubungi asisten.', failed: true }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <section
          className="fixed right-6 bottom-[88px] z-199 flex w-[320px] flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_12px_36px_#18231e33] max-lg:bottom-[148px] max-lg:max-h-[calc(100dvh-164px)] max-md:right-2 max-md:w-[calc(100vw-16px)]"
          role="dialog"
          aria-label="Chat AI"
        >
          <header className="flex items-center justify-between bg-ink px-4 py-3.5 text-[14px] font-bold text-white">
            🤖 Asisten UMKM
            <button className="cursor-pointer p-0 text-[22px] leading-none text-white" onClick={() => setOpen(false)} aria-label="Tutup chat">×</button>
          </header>
          <p className="border-b border-line bg-white px-4 py-2 text-[11px] leading-[1.4] text-muted">Jangan tuliskan data pribadi seperti alamat atau nomor rekening di sini.</p>
          <div className="flex max-h-[320px] min-h-[200px] flex-col gap-2.5 overflow-y-auto p-4 text-[14px] text-muted" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? userBubble : aiBubble}>
                {msg.text}
                {msg.failed && wa && (
                  <> <a className="mt-1.5 inline-block font-bold text-ink underline" href={wa} target="_blank" rel="noreferrer">Tanya lewat WhatsApp ↗</a></>
                )}
              </div>
            ))}
            {loading && <div className={aiBubble}>Mengetik…</div>}
          </div>
          <form className="flex gap-2 border-t border-line px-3 py-2.5" onSubmit={send}>
            <input
              ref={inputRef}
              className="flex-1 rounded-[20px] border border-line bg-white px-[13px] py-[9px] text-[13px] outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_LENGTH}
              placeholder="Tulis pesan..."
              aria-label="Pesan"
              disabled={loading}
            />
            <button
              className="size-9 cursor-pointer rounded-full bg-ink text-[16px] text-white"
              type="submit"
              aria-label="Kirim"
              disabled={loading || coolingDown || !input.trim()}
            >
              ↑
            </button>
          </form>
        </section>
      )}
      <button
        className="fixed right-6 bottom-6 z-200 flex cursor-pointer items-center gap-2 rounded-full bg-ink px-[17px] py-[13px] text-[14px] font-bold text-white shadow-[0_8px_22px_#18231e40] max-lg:bottom-[88px] max-md:right-2 max-md:bottom-20"
        onClick={() => setOpen((o) => !o)}
        aria-label="Buka chat AI"
      >
        💬<span className="text-[12px]">Chat AI</span>
      </button>
    </>
  )
}
