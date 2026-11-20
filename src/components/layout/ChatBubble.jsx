import { useEffect, useRef, useState } from 'react'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  .replace(/\/+$/, '').replace(/\/api$/, '') + '/api'

const WELCOME = { role: 'model', text: 'Halo! Ada yang bisa kami bantu seputar produk atau info UMKM kami? 😊' }

export default function ChatBubble() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [messages, setMsgs]   = useState([WELCOME])
  const [loading, setLoading] = useState(false)
  const bodyRef               = useRef(null)
  const inputRef              = useRef(null)

  // scroll to bottom on new message
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, open])

  // focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const history = messages
      .filter(m => m.role === 'user' || m.role === 'model')
      .slice(-10)
      .map(m => ({ role: m.role, text: m.text }))
    setMsgs(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()
      setMsgs(prev => [
        ...prev,
        { role: 'model', text: res.ok ? data.answer : (data.message || 'Maaf, terjadi kesalahan.') },
      ])
    } catch {
      setMsgs(prev => [...prev, { role: 'model', text: 'Gagal menghubungi asisten, coba lagi.' }])
    } finally {
      setLoading(false)
    }
  }

  return <>
    {open && <section className="chatbox" role="dialog" aria-label="Chat AI">
      <header>
        🤖 Asisten UMKM
        <button onClick={() => setOpen(false)} aria-label="Tutup chat">×</button>
      </header>
      <div className="chatbox-body" ref={bodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'msg-user' : 'msg-ai'}>{msg.text}</div>
        ))}
        {loading && <div className="msg-ai">Mengetik…</div>}
      </div>
      <form className="chatbox-form" onSubmit={send}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          aria-label="Pesan"
          disabled={loading}
        />
        <button type="submit" aria-label="Kirim" disabled={loading || !input.trim()}>↑</button>
      </form>
    </section>}
    <button className="chat-bubble" onClick={() => setOpen(o => !o)} aria-label="Buka chat AI">
      💬<span>Chat AI</span>
    </button>
  </>
}
