import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { categoryName, formatPrice } from '../../utils/formatters'
import AddToCartButton from './AddToCartButton'
import { ProductImage } from './ProductCard'
import FlavourTags from './FlavourTags'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-ink/50 sm:items-center sm:p-6" onClick={onClose}>
      <article
        className="relative max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-white sm:grid sm:max-w-3xl sm:grid-cols-2 sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={product.namaProduk}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 shadow-sm"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <ProductImage product={product} />
        <div className="flex flex-col p-5 sm:p-8">
          <p className="text-sm text-muted">{categoryName(product)}</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">{product.namaProduk}</h2>
          <p className="mt-2 text-xl font-bold">{formatPrice(product.harga)}</p>
          <FlavourTags product={product} className="mt-3" />
          {product.deskripsi && <p className="mt-4 leading-relaxed text-muted">{product.deskripsi}</p>}
          <div className="mt-6 flex flex-col gap-3 sm:mt-auto sm:pt-6">
            <AddToCartButton product={product} label="Tambah ke keranjang" className="btn btn-primary" />
            <Link className="btn btn-outline" to={`/produk/${product.idProduk}`}>Lihat detail produk</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
