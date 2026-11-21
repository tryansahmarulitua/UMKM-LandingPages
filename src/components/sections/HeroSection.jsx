import { Link } from 'react-router-dom'
import { assetUrl } from '../../services/api'
import { BUSINESS_NAME } from '../../utils/formatters'
import { HeroImageSkeleton } from '../ui/LoadingState'

const stats = [
  ['100%', 'Bahan pilihan'],
  ['50+', 'Produk lokal'],
  ['4.9/5', 'Rating pelanggan'],
]

export default function HeroSection({ profile, loading }) {
  const title = profile?.namaUMKM || BUSINESS_NAME
  const description = profile?.deskripsi || 'Abon, keripik, kue kering, dan camilan rumahan. Dibuat dengan bahan terbaik dan cerita di setiap gigitannya.'
  const coverImg = assetUrl(profile?.foto)

  return (
    <section
      id="beranda"
      className="wrapper grid grid-cols-2 items-center gap-[75px] pt-[155px] pb-[115px] max-lg:gap-[42px] max-lg:pt-[132px] max-lg:pb-[88px] max-md:flex max-md:flex-col max-md:items-stretch max-md:gap-[30px] max-md:pt-[104px] max-md:pb-[68px]"
    >
      <div>
        <p className="eyebrow">UMKM lokal, rasa nasional</p>
        <h1 className="display max-lg:text-[58px] max-md:mb-5 max-md:text-[44px] max-md:leading-[1.08] max-md:tracking-[-2px]">
          {title},<br /><em className="accent">Dari Hati.</em>
        </h1>
        <p className="max-w-[430px] text-[15px] leading-[1.7] text-muted max-md:text-[14px] max-md:leading-[1.6]">{description}</p>
        <div className="mt-8 flex items-center gap-7 max-md:mt-[26px] max-md:flex-wrap max-md:gap-4">
          <Link className="btn" to="/produk">Lihat Produk <span>↓</span></Link>
          <Link className="text-link" to="/tentang">Kenali kami <span>↗</span></Link>
        </div>
        <div className="mt-[75px] flex gap-[37px] max-lg:gap-7 max-md:mt-10 max-md:justify-between max-md:gap-3">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col gap-1.5">
              <strong className="text-[22px] max-md:text-[18px]">{value}</strong>
              <small className="text-[11px] text-[#8b938b] max-md:text-[10px]">{label}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="relative max-md:-order-1 max-md:-mx-4">
        <div className="h-[510px] overflow-hidden rounded-[190px_190px_8px_8px] max-lg:h-[430px] max-md:h-[285px] max-md:rounded-[0_0_8px_8px]">
          {loading && !coverImg
            ? <HeroImageSkeleton />
            : coverImg && <img className="size-full object-cover" src={coverImg} alt={`Cover ${title}`} />}
        </div>
        <div className="absolute bottom-[35px] -left-[35px] grid size-[115px] -rotate-12 place-content-center rounded-full bg-lime text-center text-[9px] leading-[1.3] tracking-[1px] max-md:bottom-[26px] max-md:left-2 max-md:origin-bottom-left max-md:rotate-0 max-md:scale-[.82]">
          DIBUAT<br /><strong className="text-[11px]">DENGAN</strong><br />HATI <span>✦</span>
        </div>
        <div className="absolute top-[45px] -right-[17px] rounded-md bg-white px-[18px] py-[13px] text-[12px] leading-[1.5] shadow-[0_12px_30px_#18231e15] max-md:top-[38px] max-md:right-0 max-md:origin-top-right max-md:scale-[.86]">
          Pilihan<br /><strong className="font-serif text-[16px]">favoritmu</strong> ada di sini <span className="ml-2 text-[25px] text-leaf-bright">♡</span>
        </div>
      </div>
    </section>
  )
}
