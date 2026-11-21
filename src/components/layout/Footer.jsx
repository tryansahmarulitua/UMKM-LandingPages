import { Link } from 'react-router-dom'
import { waLink } from '../../utils/whatsapp'
import { BUSINESS_NAME } from '../../utils/formatters'
import { httpUrl } from '../../utils/url'

export default function Footer({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const phone = profile?.noTelepon
  const wa = waLink(phone)
  const email = profile?.email
  const socials = httpUrl(profile?.mediaSosial)

  return (
    <footer id="kontak">
      <div className="container footer-content">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">{name[0]}</span>
            <span>{name}<span className="brand-dot">.</span></span>
          </Link>
          <p>Rasa baik, dari hati.<br />Mendukung UMKM lokal tumbuh bersama.</p>
        </div>
        <div className="footer-column">
          <strong>Hubungi kami</strong>
          {wa && <a href={wa}>{phone}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
        </div>
        {socials && (
          <div className="footer-column">
            <strong>Ikuti kami</strong>
            <a href={socials} target="_blank" rel="noreferrer">{socials} ↗</a>
          </div>
        )}
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {name}. Dibuat dengan hati.</span>
        <span>Indonesia</span>
      </div>
    </footer>
  )
}
