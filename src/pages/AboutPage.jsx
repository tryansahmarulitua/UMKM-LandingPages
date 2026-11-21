import { assetUrl } from '../services/api'
import { BUSINESS_NAME } from '../utils/formatters'
import { httpUrl } from '../utils/url'
import { waLink } from '../utils/whatsapp'

export default function AboutPage({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const description = profile?.deskripsi || 'Kami hadir untuk memperkenalkan kekayaan rasa dan kreativitas UMKM lokal.'
  const phone = profile?.noTelepon
  const wa = waLink(phone, `Halo ${name}, saya ingin bertanya`)
  const email = profile?.email
  const socials = httpUrl(profile?.mediaSosial)
  const coverImg = assetUrl(profile?.foto)

  return (
    <div className="about-page container">
      <div className="about-page-hero">
        {coverImg && <img src={coverImg} alt={name} />}
        <div className="about-page-overlay">
          <h1>{name}</h1>
        </div>
      </div>
      <div className="about-page-body">
        <div className="about-page-desc">
          <p className="eyebrow">Tentang Kami</p>
          <h2>Lebih dari sekadar <em>produk.</em></h2>
          <p>{description}</p>
          <p>Setiap pembelianmu adalah dukungan nyata untuk pelaku usaha lokal yang bekerja keras setiap hari.</p>
        </div>
        <div className="about-page-info">
          <h3>Informasi Kontak</h3>
          <ul>
            <li><span>📍</span> {profile?.alamat || '-'}</li>
            <li><span>📞</span> {wa ? <a href={wa}>{phone}</a> : '-'}</li>
            <li><span>✉️</span> {email ? <a href={`mailto:${email}`}>{email}</a> : '-'}</li>
            {socials && <li><span>🔗</span> <a href={socials} target="_blank" rel="noreferrer">{socials}</a></li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
