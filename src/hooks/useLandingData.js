import { useEffect, useState } from 'react'
import { getProfile, getProducts } from '../services/api'

// Products and profile load independently, so one failing request does not blank the other.
export function useLandingData() {
  const [products, setProducts] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState({ products: false, profile: false })

  useEffect(() => {
    Promise.allSettled([getProducts(), getProfile()]).then(([produk, profil]) => {
      if (produk.status === 'fulfilled') setProducts(produk.value ?? [])
      if (profil.status === 'fulfilled') setProfile(profil.value ?? null)
      setFailed({ products: produk.status === 'rejected', profile: profil.status === 'rejected' })
      setLoading(false)
    })
  }, [])

  return { products, profile, loading, failed }
}
