import { useMemo, useState } from 'react'
import ProductCard from '../components/ui/ProductCard'
import ProductModal from '../components/ui/ProductModal'
import EmptyState from '../components/ui/EmptyState'
import { ProductGridSkeleton } from '../components/ui/LoadingState'

const ALL = 'Semua'

export default function ProductsPage({ products = [], phone, loading = false }) {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = [ALL, ...new Set(products.map(({ kategori }) => kategori?.namaKategori).filter(Boolean))]
  const filteredProducts = useMemo(() => products.filter((product) => (
    (category === ALL || product.kategori?.namaKategori === category)
    && product.namaProduk.toLowerCase().includes(query.toLowerCase())
  )), [products, category, query])

  return (
    <section id="produk" className="wrapper pt-32 pb-[115px]">
      <div className="mb-[42px] flex items-end justify-between max-md:block">
        <div>
          <p className="eyebrow">Koleksi pilihan</p>
          <h2 className="display m-0 text-[44px] max-md:text-[36px]">Temukan <em className="accent">favoritmu.</em></h2>
        </div>
        <p className="max-w-[270px] text-[13px] leading-[1.6] text-muted max-md:mt-5">
          Dari dapur kami ke meja makanmu. Semua produk dibuat dengan penuh perhatian.
        </p>
      </div>
      <div className="mb-[27px] flex items-center justify-between border-b border-line pb-4 max-md:flex-col max-md:items-stretch max-md:gap-3.5">
        <div className="flex gap-[25px] max-md:flex-wrap max-md:gap-3.5 max-md:overflow-x-auto max-md:pb-1 max-md:whitespace-nowrap">
          {categories.map((item) => (
            <button
              key={item}
              className={`cursor-pointer text-[13px] ${category === item ? 'font-bold text-ink' : 'text-[#9aa099]'}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-[7px] text-[#89918a] max-md:w-full">
          <span>⌕</span>
          <input
            className="w-[125px] text-[12px] outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari produk..."
          />
        </label>
      </div>
      {loading ? (
        <ProductGridSkeleton />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.idProduk} product={product} phone={phone} onSelect={setSelectedProduct} />
          ))}
        </div>
      ) : (
        <EmptyState>Tidak ada produk.</EmptyState>
      )}
      <ProductModal product={selectedProduct} phone={phone} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
