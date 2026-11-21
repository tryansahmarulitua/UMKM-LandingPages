import { assetUrl } from '../../services/api'
import { categoryName, formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'

export default function ProductCard({ product, phone, onSelect }) {
  const name = product.namaProduk
  const image = assetUrl(product.foto)
  const order = orderLink(phone, name)

  return (
    <article className="product-card" onClick={() => onSelect?.(product)}>
      <div className="product-card-link">
        <div className="product-photo">
          {image && <img src={image} alt={name} loading="lazy" decoding="async" />}
          <span className="product-category">{categoryName(product)}</span>
        </div>
        <div className="product-info">
          <h3>{name}</h3>
          <p>{product.deskripsi}</p>
          <div className="product-bottom">
            <strong>{formatPrice(product.harga)}</strong>
          </div>
        </div>
      </div>
      {order && (
        <a className="product-order-btn" href={order} onClick={(event) => event.stopPropagation()}>
          Pesan <span>↗</span>
        </a>
      )}
    </article>
  )
}
