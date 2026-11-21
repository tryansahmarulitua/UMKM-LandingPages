import { useMemo, useState } from 'react'
import ProductCard from '../components/ui/ProductCard'
import ProductModal from '../components/ui/ProductModal'
import LoadingState from '../components/ui/LoadingState'

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
    <section id="produk" className="products-section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Koleksi pilihan</p>
          <h2>Temukan <em>favoritmu.</em></h2>
        </div>
        <p className="section-description">Dari dapur kami ke meja makanmu. Semua produk dibuat dengan penuh perhatian.</p>
      </div>
      <div className="filters">
        <div className="category-list">
          {categories.map((item) => (
            <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>
              {item}
            </button>
          ))}
        </div>
        <label className="search">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari produk..." />
        </label>
      </div>
      {loading ? (
        <LoadingState type="products" />
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.idProduk} product={product} phone={phone} onSelect={setSelectedProduct} />
          ))}
        </div>
      ) : (
        <p className="empty-products">Tidak ada produk.</p>
      )}
      <ProductModal product={selectedProduct} phone={phone} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
