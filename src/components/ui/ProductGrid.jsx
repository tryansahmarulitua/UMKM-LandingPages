import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

const GRID = 'grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4'

export default function ProductGrid({ products }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className={GRID}>
        {products.map((product) => (
          <ProductCard key={product.idProduk} product={product} onSelect={setSelected} />
        ))}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={GRID} role="status" aria-live="polite" aria-label="Memuat produk...">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-line bg-white" aria-hidden="true">
          <div className="skeleton aspect-square" />
          <div className="space-y-2.5 p-4">
            <div className="skeleton h-3 w-1/3 rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
