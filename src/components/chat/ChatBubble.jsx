import { useEffect, useRef, useState } from 'react'
import { sendChat } from '../../services/api'
import { waLink } from '../../utils/whatsapp'

// Limits from Project Plan §4.5; the backend enforces them too.
const MAX_LENGTH = 500
const MESSAGE_GAP_MS = 3000

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
        <section className="chatbox" role="dialog" aria-label="Chat AI">
          <header>
            🤖 Asisten UMKM
            <button onClick={() => setOpen(false)} aria-label="Tutup chat">×</button>
          </header>
          <p className="chatbox-note">Jangan tuliskan data pribadi seperti alamat atau nomor rekening di sini.</p>
          <div className="chatbox-body" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'msg-user' : 'msg-ai'}>
                {msg.text}
                {msg.failed && wa && (
                  <> <a className="chatbox-wa" href={wa} target="_blank" rel="noreferrer">Tanya lewat WhatsApp ↗</a></>
                )}
              </div>
            ))}
            {loading && <div className="msg-ai">Mengetik…</div>}
          </div>
          <form className="chatbox-form" onSubmit={send}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_LENGTH}
              placeholder="Tulis pesan..."
              aria-label="Pesan"
              disabled={loading}
            />
            <button type="submit" aria-label="Kirim" disabled={loading || coolingDown || !input.trim()}>↑</button>
          </form>
        </section>
      )}
      <button className="chat-bubble" onClick={() => setOpen((o) => !o)} aria-label="Buka chat AI">
        💬<span>Chat AI</span>
      </button>
    </>
  )
}
