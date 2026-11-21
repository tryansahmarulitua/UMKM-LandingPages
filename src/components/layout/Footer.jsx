import { waLink } from '../../utils/whatsapp'
import { BUSINESS_NAME } from '../../utils/formatters'
import { httpUrl } from '../../utils/url'
import Brand from './Brand'

const column = 'flex flex-col gap-[13px] text-[12px] text-[#aeb5af] max-md:min-w-0 max-md:gap-2'
const columnLink = 'max-lg:text-[13px] max-md:text-[12px] max-md:wrap-anywhere'

export default function Footer({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const phone = profile?.noTelepon
  const wa = waLink(phone)
  const email = profile?.email
  const socials = httpUrl(profile?.mediaSosial)

  return (
    <footer id="kontak" className="bg-ink pt-[55px] pb-[25px] text-white max-lg:pt-12 max-lg:pb-[88px] max-md:pt-[42px] max-md:pb-24">
      <div className="wrapper flex justify-between max-lg:gap-x-8 max-lg:gap-y-6 max-md:grid max-md:grid-cols-2 max-md:gap-x-[18px] max-md:gap-y-7">
        <div className="max-md:col-span-full">
          <Brand name={name} className="text-white max-md:text-[18px]" />
          <p className="mt-5 text-[12px] leading-[1.7] text-[#9aa39b]">
            Rasa baik, dari hati.<br />Mendukung UMKM lokal tumbuh bersama.
          </p>
        </div>
        <div className={column}>
          <strong className="mb-1 text-white">Hubungi kami</strong>
          {wa && <a className={columnLink} href={wa}>{phone}</a>}
          {email && <a className={columnLink} href={`mailto:${email}`}>{email}</a>}
        </div>
        {socials && (
          <div className={column}>
            <strong className="mb-1 text-white">Ikuti kami</strong>
            <a className={columnLink} href={socials} target="_blank" rel="noreferrer">{socials} ↗</a>
          </div>
        )}
      </div>
      <div className="wrapper mt-[52px] flex justify-between border-t border-[#35403a] pt-[18px] text-[10px] text-[#7c877f] max-md:mt-8 max-md:flex-col max-md:items-start max-md:gap-2 max-md:leading-[1.5]">
        <span>© {new Date().getFullYear()} {name}. Dibuat dengan hati.</span>
        <span>Indonesia</span>
      </div>
    </footer>
  )
}
