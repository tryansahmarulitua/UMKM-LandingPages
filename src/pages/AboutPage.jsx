import { assetUrl } from '../services/api'
import { waLink } from '../utils/whatsapp'

export default function AboutPage({ profile }) {
  const name        = profile?.namaUMKM   || 'Jatisampurna'
  const deskripsi   = profile?.deskripsi  || 'Kami hadir untuk memperkenalkan kekayaan rasa dan kreativitas UMKM lokal.'
  const alamat      = profile?.alamat     || '-'
  const phone       = profile?.noTelepon  || '-'
  const email       = profile?.email      || '-'
  const mediaSosial = profile?.mediaSosial
  const coverImg    = assetUrl(profile?.foto)

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
          <p>{deskripsi}</p>
          <p>Setiap pembelianmu adalah dukungan nyata untuk pelaku usaha lokal yang bekerja keras setiap hari.</p>
        </div>
        <div className="about-page-info">
          <h3>Informasi Kontak</h3>
          <ul>
            <li><span>📍</span> {alamat}</li>
            <li><span>📞</span> <a href={waLink(`Halo ${name}, saya ingin bertanya`)}>{phone}</a></li>
            <li><span>✉️</span> {email !== '-' ? <a href={`mailto:${email}`}>{email}</a> : '-'}</li>
            {mediaSosial && <li><span>🔗</span> <a href={mediaSosial} target="_blank" rel="noreferrer">{mediaSosial}</a></li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
