import { NavLink } from 'react-router-dom'
import { House, Info, LayoutGrid } from 'lucide-react'
import { NAV_ITEMS } from '../../content'

const ICONS = { '/': House, '/produk': LayoutGrid, '/tentang': Info }

export default function BottomTabBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Navigasi utama"
    >
      {NAV_ITEMS.map(({ to, label }) => {
        const Icon = ICONS[to]
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `flex h-16 flex-col items-center justify-center gap-1 text-xs ${isActive ? 'font-semibold text-brand' : 'text-muted'}`}
          >
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </NavLink>
        )
      })}
    </nav>
  )
}
