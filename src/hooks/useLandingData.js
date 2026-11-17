import { useEffect, useState } from 'react'
import { getProfile, getProducts } from '../services/api'

/**
 * Hook tunggal yang menyediakan state produk + profil dari API.
 * loading: true saat fetch berjalan
 * error: string pesan error jika gagal
 */
export function useLandingData() {
  const [products, setProducts] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([getProducts(), getProfile()])
      .then(([produkData, profilData]) => {
        setProducts(produkData ?? [])
        setProfile(profilData ?? null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, profile, loading, error }
}
