import { useState } from 'react'

export default function ChatBubble() {
  const [open, setOpen] = useState(false)

  return <>
    {open && <section className="chatbox" role="dialog" aria-label="Chat AI">
      <header>Asisten UMKM <button onClick={() => setOpen(false)} aria-label="Tutup chat">×</button></header>
      <div className="chatbox-body">Halo! Ada yang bisa kami bantu?</div>
      <form className="chatbox-form" onSubmit={(event) => event.preventDefault()}>
        <input placeholder="Tulis pesan..." aria-label="Pesan" />
        <button type="submit" aria-label="Kirim">↑</button>
      </form>
    </section>}
    <button className="chat-bubble" onClick={() => setOpen(!open)} aria-label="Buka chat AI">💬<span>Chat AI</span></button>
  </>
}
