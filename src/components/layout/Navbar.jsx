import { Link, NavLink } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { business, NAV_ITEMS } from '../../content'
import { askLink } from '../../utils/whatsapp'

export default function Navbar({ profile }) {
  const { name } = business(profile)
  const wa = askLink(profile?.noTelepon)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="wrapper flex h-16 items-center justify-between gap-6">
        <Link to="/" className="min-w-0 truncate text-lg font-bold tracking-tight">{name}</Link>
        <nav className="hidden gap-8 text-sm md:flex" aria-label="Navigasi utama">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        {wa && (
          <a className="btn btn-primary max-sm:size-10 max-sm:px-0" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Pesan lewat WhatsApp">
            <MessageCircle className="size-4" aria-hidden="true" />
            <span className="max-sm:hidden">Pesan lewat WhatsApp</span>
          </a>
        )}
      </div>
    </header>
  )
}
