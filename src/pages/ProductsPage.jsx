import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'
import ProductGrid, { ProductGridSkeleton } from '../components/ui/ProductGrid'
import { PRODUCTS_UNAVAILABLE } from '../content'

const ALL = 'Semua'

export default function ProductsPage({ products, loading, failed }) {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const categories = [ALL, ...new Set(products.map(({ kategori }) => kategori?.namaKategori).filter(Boolean))]
  const filteredProducts = useMemo(() => products.filter((product) => (
    (category === ALL || product.kategori?.namaKategori === category)
    && product.namaProduk.toLowerCase().includes(query.trim().toLowerCase())
  )), [products, category, query])

  return (
    <main className="wrapper py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight">Katalog</h1>
      <p className="mt-2 text-muted">Masukkan produk ke keranjang, lalu checkout tanpa perlu membuat akun.</p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter kategori">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={`h-9 shrink-0 cursor-pointer rounded-full border px-4 text-sm transition-colors ${category === item ? 'border-ink bg-ink text-white' : 'border-line bg-white text-muted hover:border-ink hover:text-ink'}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4 focus-within:border-ink md:w-72">
          <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            type="search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari produk"
            aria-label="Cari produk"
          />
        </label>
      </div>

      <div className="mt-6">
        {loading
          ? <ProductGridSkeleton />
          : filteredProducts.length > 0
            ? <ProductGrid products={filteredProducts} />
            : <EmptyState>{failed ? PRODUCTS_UNAVAILABLE : products.length ? 'Tidak ada produk yang cocok dengan pencarianmu.' : 'Belum ada produk yang ditampilkan.'}</EmptyState>}
      </div>
    </main>
  )
}
