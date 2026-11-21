import { NavLink } from 'react-router-dom'
import { House, Info, LayoutGrid, ShoppingBag } from 'lucide-react'
import { NAV_ITEMS } from '../../content'
import { useKeranjang } from '../../hooks/useKeranjang'

const ICONS = { '/': House, '/produk': LayoutGrid, '/tentang': Info, '/keranjang': ShoppingBag }

export default function BottomTabBar() {
  const { jumlahBarang } = useKeranjang()
  const tabs = [...NAV_ITEMS, { to: '/keranjang', label: 'Keranjang' }]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Navigasi utama"
    >
      {tabs.map(({ to, label }) => {
        const Icon = ICONS[to]
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `flex h-16 flex-col items-center justify-center gap-1 text-xs ${isActive ? 'font-semibold text-brand' : 'text-muted'}`}
          >
            <span className="relative">
              <Icon className="size-5" aria-hidden="true" />
              {to === '/keranjang' && jumlahBarang > 0 && (
                <span className="absolute -top-1.5 -right-2.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">{jumlahBarang}</span>
              )}
            </span>
            {label}
          </NavLink>
        )
      })}
    </nav>
  )
}
