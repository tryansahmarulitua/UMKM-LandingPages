import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { ProductImage } from '../components/ui/ProductCard'
import EmptyState from '../components/ui/EmptyState'
import { PRODUCTS_UNAVAILABLE } from '../content'
import { categoryName, formatPrice } from '../utils/formatters'
import { orderLink } from '../utils/whatsapp'

const backLink = (
  <Link className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink" to="/produk">
    <ArrowLeft className="size-4" aria-hidden="true" /> Kembali ke katalog
  </Link>
)

export default function ProductDetailPage({ products, loading, failed, phone }) {
  const { id } = useParams()
  const product = products.find((item) => String(item.idProduk) === id)

  if (loading) {
    return (
      <main className="wrapper py-8 md:py-12" role="status" aria-label="Memuat produk...">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-1/4 rounded" />
            <div className="skeleton h-8 w-2/3 rounded" />
            <div className="skeleton h-6 w-1/3 rounded" />
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="wrapper space-y-6 py-8 md:py-12">
        {backLink}
        <EmptyState>{failed ? PRODUCTS_UNAVAILABLE : 'Produk tidak ditemukan.'}</EmptyState>
      </main>
    )
  }

  const order = orderLink(phone, product.namaProduk)

  return (
    <main className="wrapper py-8 md:py-12">
      {backLink}
      <article className="mt-6 grid gap-6 md:grid-cols-2 md:gap-12">
        <ProductImage product={product} className="rounded-2xl border border-line" />
        <div>
          <p className="text-sm text-muted">{categoryName(product)}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{product.namaProduk}</h1>
          <p className="mt-3 text-2xl font-bold">{formatPrice(product.harga)}</p>
          {product.deskripsi && <p className="mt-5 max-w-prose leading-relaxed text-muted">{product.deskripsi}</p>}
          {order && (
            <a className="btn btn-primary mt-8 w-full sm:w-auto" href={order} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Pesan via WhatsApp
            </a>
          )}
          <p className="mt-4 text-sm text-muted">Ongkos kirim dan ketersediaan dikonfirmasi lewat WhatsApp.</p>
        </div>
      </article>
    </main>
  )
}
