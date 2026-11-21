import { Link } from 'react-router-dom'
import { waLink } from '../../utils/whatsapp'
import { BUSINESS_NAME } from '../../utils/formatters'
import Brand from './Brand'

export default function Navbar({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const wa = waLink(profile?.noTelepon)

  return (
    <nav className="wrapper fixed inset-x-0 top-0 z-100 flex h-[88px] min-h-[88px] items-center justify-between gap-6 border-b border-line bg-cream max-md:h-[72px] max-md:min-h-[72px] max-md:gap-3">
      <Brand name={name} className="min-w-0 whitespace-nowrap max-md:overflow-hidden max-md:text-ellipsis" />
      <div className="flex gap-[38px] text-[14px] whitespace-nowrap text-[#69716c] max-lg:hidden">
        <Link to="/">Beranda</Link>
        <Link to="/produk">Produk</Link>
        <Link to="/tentang">Tentang Kami</Link>
      </div>
      {wa && (
        <a
          className="rounded-[30px] bg-ink px-[19px] py-[13px] text-[13px] whitespace-nowrap text-white max-lg:hidden max-md:px-[13px] max-md:py-2.5"
          href={wa}
        >
          Pesan Sekarang <span>↗</span>
        </a>
      )}
    </nav>
  )
}
