import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomTabBar from './components/layout/BottomTabBar'
import ChatBubble from './components/chat/ChatBubble'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import KeranjangPage from './pages/KeranjangPage'
import { KeranjangProvider } from './hooks/useKeranjang'
import { useLandingData } from './hooks/useLandingData'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const { products, profile, loading, failed } = useLandingData()
  const phone = profile?.noTelepon

  return (
    <KeranjangProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar profile={profile} />
      {failed.profile && <p className="wrapper mt-6 rounded-xl border border-brand/30 bg-brand-soft px-4 py-3 text-sm" role="alert">Kontak usaha belum bisa dimuat. Coba muat ulang halaman sebentar lagi.</p>}
      <Routes>
        <Route path="/" element={<HomePage profile={profile} products={products} loading={loading} failed={failed.products} />} />
        <Route path="/produk" element={<ProductsPage products={products} loading={loading} failed={failed.products} />} />
        <Route path="/produk/:id" element={<ProductDetailPage products={products} loading={loading} failed={failed.products} />} />
        <Route path="/tentang" element={<AboutPage profile={profile} />} />
        <Route path="/keranjang" element={<KeranjangPage products={products} loading={loading} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer profile={profile} />
      <BottomTabBar />
      <ChatBubble phone={phone} />
    </BrowserRouter>
    </KeranjangProvider>
  )
}
