import { Store } from 'lucide-react'
import { assetUrl } from '../../services/api'
import { categoryName, formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'

export function ProductImage({ product, className = '' }) {
  const image = assetUrl(product.foto)
  return (
    <div className={`grid aspect-square place-items-center overflow-hidden bg-mist ${className}`}>
      {image
        ? <img className="size-full object-cover" src={image} alt={product.namaProduk} loading="lazy" decoding="async" />
        : <Store className="size-10 text-muted/40" aria-hidden="true" />}
    </div>
  )
}

export default function ProductCard({ product, phone, onSelect }) {
  const order = orderLink(phone, product.namaProduk)

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-md">
      <button type="button" className="group flex flex-1 cursor-pointer flex-col text-left" onClick={() => onSelect(product)}>
        <ProductImage product={product} className="[&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-[1.03]" />
        <div className="flex flex-1 flex-col px-3 pt-3 sm:px-4 sm:pt-4">
          <p className="text-xs text-muted">{categoryName(product)}</p>
          <h3 className="mt-0.5 line-clamp-2 text-[15px] leading-snug font-semibold">{product.namaProduk}</h3>
          {product.deskripsi && <p className="mt-1 line-clamp-2 text-sm text-muted max-sm:hidden">{product.deskripsi}</p>}
        </div>
      </button>
      <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
        <strong className="text-[15px]">{formatPrice(product.harga)}</strong>
        {order && (
          <a
            className="inline-flex h-9 items-center rounded-full bg-brand-soft px-3.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            href={order}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pesan ${product.namaProduk} via WhatsApp`}
          >
            Pesan
          </a>
        )}
      </div>
    </article>
  )
}
