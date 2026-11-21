import { Link } from 'react-router-dom'
import { waLink } from '../../utils/whatsapp'
import { BUSINESS_NAME } from '../../utils/formatters'

export default function Navbar({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const wa = waLink(profile?.noTelepon)

  return (
    <nav className="navbar container">
      <Link className="brand" to="/">
        <span className="brand-mark">{name[0]}</span>
        <span>{name}<span className="brand-dot">.</span></span>
      </Link>
      <div className="nav-links">
        <Link to="/">Beranda</Link>
        <Link to="/produk">Produk</Link>
        <Link to="/tentang">Tentang Kami</Link>
      </div>
      {wa && <a className="nav-order" href={wa}>Pesan Sekarang <span>↗</span></a>}
    </nav>
  )
}
