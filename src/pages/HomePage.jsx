import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/sections/HeroSection'
import OrderSteps from '../components/sections/OrderSteps'
import EmptyState from '../components/ui/EmptyState'
import ProductGrid, { ProductGridSkeleton } from '../components/ui/ProductGrid'

const FEATURED_COUNT = 8

export default function HomePage({ profile, products = [], loading = false, phone }) {
  return (
    <main>
      <HeroSection profile={profile} loading={loading} />
      <section className="wrapper py-12 md:py-16" aria-labelledby="produk-terbaru">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="produk-terbaru" className="text-2xl font-bold tracking-tight">Produk kami</h2>
          <Link className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline" to="/produk">
            Lihat semua <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        {loading
          ? <ProductGridSkeleton count={4} />
          : products.length > 0
            ? <ProductGrid products={products.slice(0, FEATURED_COUNT)} phone={phone} />
            : <EmptyState>Belum ada produk yang ditampilkan.</EmptyState>}
      </section>
      <OrderSteps />
    </main>
  )
}
