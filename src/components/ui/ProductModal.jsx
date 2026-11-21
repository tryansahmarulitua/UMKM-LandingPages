import { assetUrl } from '../../services/api'
import { BUSINESS_NAME, categoryName, formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'

export default function ProductModal({ product, phone, onClose }) {
  if (!product) return null
  const name = product.namaProduk
  const image = assetUrl(product.foto)
  const order = orderLink(phone, name)

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <article
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="product-modal-close" onClick={onClose} aria-label="Tutup">×</button>
        <div className="product-modal-photo">{image && <img src={image} alt={name} />}</div>
        <div className="product-modal-info">
          <p className="eyebrow">{categoryName(product)}</p>
          <h2>{name}</h2>
          <p>{product.deskripsi || `Produk pilihan ${BUSINESS_NAME}.`}</p>
          <strong>{formatPrice(product.harga)}</strong>
          {order && <a className="button button-dark" href={order}>Pesan sekarang <span>↗</span></a>}
        </div>
      </article>
    </div>
  )
}
