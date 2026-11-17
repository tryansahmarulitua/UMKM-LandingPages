import { Link, useLocation } from 'react-router-dom'

export default function BottomTabBar() {
  const { pathname } = useLocation()
  return <nav className="bottom-tab-bar" aria-label="Navigasi utama"><Link className={pathname === '/' ? 'active' : ''} to="/"><span>⌂</span>Beranda</Link><Link className={pathname.startsWith('/produk') ? 'active' : ''} to="/produk"><span>▦</span>Produk</Link><Link className={pathname === '/tentang' ? 'active' : ''} to="/tentang"><span>◎</span>Tentang</Link></nav>
}
