import HeroSection from '../components/sections/HeroSection'
import ProductSlider from '../components/sections/ProductSlider'

export default function HomePage({ profile, products, loading }) {
  return (
    <>
      <HeroSection profile={profile} loading={loading} />
      <ProductSlider products={products} phone={profile?.noTelepon} loading={loading} />
    </>
  )
}
