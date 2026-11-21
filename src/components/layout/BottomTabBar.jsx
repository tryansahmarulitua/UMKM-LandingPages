import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '⌂', label: 'Beranda', isActive: (path) => path === '/' },
  { to: '/produk', icon: '▦', label: 'Produk', isActive: (path) => path.startsWith('/produk') },
  { to: '/tentang', icon: '◎', label: 'Tentang', isActive: (path) => path === '/tentang' },
]

export default function BottomTabBar() {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-150 hidden h-[62px] items-stretch justify-around rounded-[18px] border border-[#ffffff1a] bg-[#18231ef2] p-1.5 shadow-[0_10px_30px_#18231e2e] backdrop-blur-[12px] max-lg:flex max-md:inset-x-2 max-md:bottom-2 max-md:h-[60px] max-md:rounded-2xl"
      aria-label="Navigasi utama"
    >
      {tabs.map(({ to, icon, label, isActive }) => (
        <Link
          key={to}
          to={to}
          className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[13px] text-[10px] ${isActive(pathname) ? 'bg-lime font-bold text-ink' : 'text-[#b7c0b8]'}`}
        >
          <span className="text-[21px] leading-none">{icon}</span>
          {label}
        </Link>
      ))}
    </nav>
  )
}
