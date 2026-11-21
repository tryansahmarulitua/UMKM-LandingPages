import { Link } from 'react-router-dom'
import { assetUrl } from '../../services/api'
import { BUSINESS_NAME } from '../../utils/formatters'
import LoadingState from '../ui/LoadingState'

export default function HeroSection({ profile, loading }) {
  const title = profile?.namaUMKM || BUSINESS_NAME
  const description = profile?.deskripsi || 'Abon, keripik, kue kering, dan camilan rumahan. Dibuat dengan bahan terbaik dan cerita di setiap gigitannya.'
  const coverImg = assetUrl(profile?.foto)

  return (
    <section id="beranda" className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">UMKM lokal, rasa nasional</p>
        <h1>{title},<br /><em>Dari Hati.</em></h1>
        <p className="hero-text">{description}</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/produk">Lihat Produk <span>↓</span></Link>
          <Link className="text-link" to="/tentang">Kenali kami <span>↗</span></Link>
        </div>
        <div className="hero-stats">
          <div><strong>100%</strong><small>Bahan pilihan</small></div>
          <div><strong>50+</strong><small>Produk lokal</small></div>
          <div><strong>4.9/5</strong><small>Rating pelanggan</small></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image">
          {loading && !coverImg
            ? <LoadingState type="hero-image" />
            : coverImg && <img src={coverImg} alt={`Cover ${title}`} />}
        </div>
        <div className="stamp">DIBUAT<br /><strong>DENGAN</strong><br />HATI <span>✦</span></div>
        <div className="floating-note">Pilihan<br /><strong>favoritmu</strong> ada di sini <span>♡</span></div>
      </div>
    </section>
  )
}
