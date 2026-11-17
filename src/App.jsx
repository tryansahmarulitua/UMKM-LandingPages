import './App.css'
import './styles/pages.css'
import './responsive.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomTabBar from './components/layout/BottomTabBar'
import ChatBubble from './components/layout/ChatBubble'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import { useLandingData } from './hooks/useLandingData'

function App() {
  const { products, profile, loading, error } = useLandingData()
  const [routeError, setRouteError] = useState(error)
  useEffect(() => setRouteError(error), [error])
  return <BrowserRouter><Navbar profile={profile} />{routeError && <p className="container page-status">Gagal memuat data: {routeError}</p>}<Routes><Route path="/" element={<HomePage profile={profile} products={products} loading={loading} />} /><Route path="/produk" element={<ProductsPage products={products} loading={loading} />} /><Route path="/produk/:id" element={<ProductDetailPage products={products} />} /><Route path="/tentang" element={<AboutPage profile={profile} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><Footer profile={profile} /><BottomTabBar /><ChatBubble /></BrowserRouter>
}

export default App

