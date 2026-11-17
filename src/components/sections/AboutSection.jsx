import { assetUrl } from '../../services/api'

export default function AboutSection({ profile }) {
  const name = profile?.namaUMKM || 'Jatisampurna'
  const desc = profile?.deskripsi || 'Jatisampurna hadir untuk memperkenalkan kekayaan rasa dan kreativitas UMKM lokal.'
  const alamat = profile?.alamat || ''
  const coverImg = assetUrl(profile?.foto)

  return (
    <section id="tentang" className="about container">
      <div className="about-photo">
        {coverImg && <img src={coverImg} alt={name} />}
        <span>Sejak<br /><strong>2020</strong></span>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Cerita kami</p>
        <h2>Lebih dari sekadar <em>produk.</em></h2>
        <p>{desc}</p>
        {alamat && <p>{alamat}</p>}
        <a className="button button-outline" href="#kontak">Lebih tentang kami <span>↗</span></a>
      </div>
    </section>
  )
}
