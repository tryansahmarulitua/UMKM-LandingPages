import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'
import { business, NAV_ITEMS } from '../../content'
import { httpUrl, socialLabel } from '../../utils/url'
import { waLink } from '../../utils/whatsapp'
import InstagramIcon from '../ui/InstagramIcon'

export default function Footer({ profile }) {
  const { name, description } = business(profile)
  const phone = profile?.noTelepon
  const wa = waLink(phone)
  const email = profile?.email
  const socials = httpUrl(profile?.mediaSosial)

  return (
    <footer className="bg-ink pb-16 text-sm text-white/70 md:pb-0">
      <div className="wrapper grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">{name}</p>
          <p className="mt-2 line-clamp-3 max-w-xs">{description}</p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Kontak</h2>
          <ul className="mt-3 space-y-2">
            {wa && (
              <li>
                <a className="inline-flex items-center gap-2 hover:text-white" href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden="true" /> {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a className="inline-flex items-center gap-2 break-all hover:text-white" href={`mailto:${email}`}>
                  <Mail className="size-4 shrink-0" aria-hidden="true" /> {email}
                </a>
              </li>
            )}
            {socials && (
              <li>
                <a className="inline-flex items-center gap-2 hover:text-white" href={socials} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="size-4" /> {socialLabel(socials)}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Menu</h2>
          <ul className="mt-3 space-y-2">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}><Link className="hover:text-white" to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="wrapper py-5 text-xs text-white/50">© {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  )
}
