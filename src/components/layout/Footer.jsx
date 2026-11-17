export default function Footer({ profile }) {
  const name = profile?.namaUMKM || 'Jatisampurna'
  const phone = profile?.noTelepon || '6281234567890'
  const email = profile?.email || null
  const wa = `https://wa.me/${phone.replace(/\D/g, '')}`
  const socials = profile?.mediaSosial || null

  return <footer id="kontak"><div className="container footer-content"><div><a className="brand footer-brand" href="#beranda"><span className="brand-mark">{name[0]}</span><span>{name}<span className="brand-dot">.</span></span></a><p>Rasa baik, dari hati.<br />Mendukung UMKM lokal tumbuh bersama.</p></div><div className="footer-column"><strong>Hubungi kami</strong><a href={wa}>{phone}</a>{email && <a href={`mailto:${email}`}>{email}</a>}</div>{socials && <div className="footer-column"><strong>Ikuti kami</strong><a href={socials} target="_blank" rel="noreferrer">{socials} ↗</a></div>}</div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {name}. Dibuat dengan hati.</span><span>Indonesia</span></div></footer>
}
