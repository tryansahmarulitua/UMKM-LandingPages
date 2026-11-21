import { useEffect, useState } from 'react'
import { getProfile, getProducts } from '../services/api'

export function useLandingData() {
  const [products, setProducts] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
