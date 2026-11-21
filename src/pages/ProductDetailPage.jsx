import { Link, useParams } from 'react-router-dom'
import { assetUrl } from '../services/api'
import { BUSINESS_NAME, categoryName, formatPrice } from '../utils/formatters'
import { orderLink } from '../utils/whatsapp'

export default function ProductDetailPage({ products = [], phone }) {
  const { id } = useParams()
  const product = products.find((item) => String(item.idProduk) === id)

  if (!product) {
    return (
      <main className="detail-page container">
        <p>Produk tidak ditemukan.</p>
        <Link className="button button-dark" to="/produk">Kembali ke produk</Link>
      </main>
    )
  }

  const name = product.namaProduk
  const image = assetUrl(product.foto)
  const order = orderLink(phone, name)

  return (
    <main className="detail-page container">
      <Link className="back-link" to="/produk">← Kembali ke produk</Link>
      <article className="product-detail">
        <div className="product-detail-photo">{image && <img src={image} alt={name} />}</div>
        <div className="product-detail-info">
          <p className="eyebrow">{categoryName(product)}</p>
          <h1>{name}</h1>
          <p>{product.deskripsi || `Produk pilihan ${BUSINESS_NAME}.`}</p>
          <strong className="product-detail-price">{formatPrice(product.harga)}</strong>
          {order && <a className="button button-dark" href={order}>Pesan sekarang <span>↗</span></a>}
        </div>
      </article>
    </main>
  )
}
