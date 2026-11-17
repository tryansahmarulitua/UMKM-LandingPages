import HeroSection from '../components/sections/HeroSection'
import ProductSlider from '../components/ui/ProductSlider'

export default function HomePage({ profile, products, loading }) {
  return <><HeroSection profile={profile} loading={loading} /><ProductSlider products={products} loading={loading} /></>
}
