import { Link, useLocation } from 'react-router-dom'

export default function BottomTabBar() {
  const { pathname } = useLocation()
  const tabClass = (active) => (active ? 'active' : '')

  return (
    <nav className="bottom-tab-bar" aria-label="Navigasi utama">
      <Link className={tabClass(pathname === '/')} to="/"><span>⌂</span>Beranda</Link>
      <Link className={tabClass(pathname.startsWith('/produk'))} to="/produk"><span>▦</span>Produk</Link>
      <Link className={tabClass(pathname === '/tentang')} to="/tentang"><span>◎</span>Tentang</Link>
    </nav>
  )
}
