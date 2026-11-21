import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { business, NAV_ITEMS } from '../../content'
import { useKeranjang } from '../../hooks/useKeranjang'

export default function Navbar({ profile }) {
  const { name } = business(profile)
  const { jumlahBarang } = useKeranjang()

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
        <Link className="btn btn-primary relative max-md:hidden" to="/keranjang" aria-label={`Keranjang, ${jumlahBarang} barang`}>
          <ShoppingBag className="size-4" aria-hidden="true" />
          Keranjang
          {jumlahBarang > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs font-bold text-brand">{jumlahBarang}</span>}
        </Link>
      </div>
    </header>
  )
}
