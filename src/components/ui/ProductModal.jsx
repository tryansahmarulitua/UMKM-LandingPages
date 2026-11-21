import { assetUrl } from '../../services/api'
import { BUSINESS_NAME, categoryName, formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'

export default function ProductModal({ product, phone, onClose }) {
  if (!product) return null
  const name = product.namaProduk
  const image = assetUrl(product.foto)
  const order = orderLink(phone, name)

  return (
    <div className="fixed inset-0 z-200 grid place-items-center bg-[#18231e99] p-5" onClick={onClose}>
      <article
        className="relative grid max-h-[90vh] w-[min(760px,100%)] grid-cols-2 overflow-auto rounded-xl bg-white max-md:max-h-[92vh] max-md:grid-cols-1"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-3.5 right-3.5 z-1 size-9 cursor-pointer rounded-full bg-white text-[25px]"
          onClick={onClose}
          aria-label="Tutup"
        >
          ×
        </button>
        <div className="min-h-[340px] bg-mist max-md:max-h-[300px] max-md:min-h-[230px]">
          {image && <img className="size-full object-cover" src={image} alt={name} />}
        </div>
        <div className="flex flex-col items-start px-9 py-11 max-md:px-[22px] max-md:pt-7 max-md:pb-[30px]">
          <p className="eyebrow">{categoryName(product)}</p>
          <h2 className="display mb-[18px] text-[38px] tracking-[-1px] max-md:text-[32px]">{name}</h2>
          <p className="leading-[1.7] text-muted">{product.deskripsi || `Produk pilihan ${BUSINESS_NAME}.`}</p>
          <strong className="my-5 text-[20px]">{formatPrice(product.harga)}</strong>
          {order && <a className="btn" href={order}>Pesan sekarang <span>↗</span></a>}
        </div>
      </article>
    </div>
  )
}
