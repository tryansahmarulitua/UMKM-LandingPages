import { assetUrl } from '../services/api'
import { BUSINESS_NAME } from '../utils/formatters'
import { httpUrl } from '../utils/url'
import { waLink } from '../utils/whatsapp'

const bodyText = 'max-w-[620px] leading-[1.8] text-muted'

export default function AboutPage({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const description = profile?.deskripsi || 'Kami hadir untuk memperkenalkan kekayaan rasa dan kreativitas UMKM lokal.'
  const phone = profile?.noTelepon
  const wa = waLink(phone, `Halo ${name}, saya ingin bertanya`)
  const email = profile?.email
  const socials = httpUrl(profile?.mediaSosial)
  const coverImg = assetUrl(profile?.foto)

  return (
    <div className="wrapper pt-[133px] pb-[100px] max-md:pt-[105px]">
      <div className="relative h-[390px] overflow-hidden rounded-[10px] max-md:h-[260px]">
        {coverImg && <img className="size-full object-cover" src={coverImg} alt={name} />}
        <div className="absolute inset-0 flex items-end bg-[linear-gradient(transparent,#18231eaa)] p-[42px] max-md:p-6">
          <h1 className="text-[58px] tracking-[-2px] text-white max-md:text-[36px]">{name}</h1>
        </div>
      </div>
      <div className="grid grid-cols-[1.3fr_.7fr] gap-[100px] pt-[75px] max-lg:gap-10 max-md:grid-cols-1 max-md:gap-[35px] max-md:pt-[42px]">
        <div>
          <p className="eyebrow">Tentang Kami</p>
          <h2 className="display text-[44px]">Lebih dari sekadar <em className="accent">produk.</em></h2>
          <p className={bodyText}>{description}</p>
          <p className={bodyText}>Setiap pembelianmu adalah dukungan nyata untuk pelaku usaha lokal yang bekerja keras setiap hari.</p>
        </div>
        <div className="border-l border-line pl-[50px] max-md:border-t max-md:border-l-0 max-md:pt-[35px] max-md:pl-0">
          <h3>Informasi Kontak</h3>
          <ul className="text-[13px] leading-[2.8] text-muted [&_a]:underline [&_li]:flex [&_li]:gap-3">
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
