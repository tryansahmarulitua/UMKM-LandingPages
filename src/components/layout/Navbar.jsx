export default function Navbar({ profile }) {
  const name = profile?.namaUMKM || 'Jatisampurna'
  const phone = profile?.noTelepon || '6281234567890'
  const wa = `https://wa.me/${phone.replace(/\D/g, '')}`
  return <nav className="navbar container"><a className="brand" href="/"><span className="brand-mark">{name[0]}</span><span>{name}<span className="brand-dot">.</span></span></a><div className="nav-links"><a href="/">Beranda</a><a href="/produk">Produk</a><a href="/tentang">Tentang Kami</a></div><a className="nav-order" href={wa}>Pesan Sekarang <span>↗</span></a></nav>
}
