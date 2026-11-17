import { formatPrice } from '../../utils/formatters'
import { waLink } from '../../utils/whatsapp'
import { assetUrl } from '../../services/api'
export default function ProductCard({ product, onSelect }) {
  const name = product.namaProduk
  const image = assetUrl(product.foto)
  return <article className="product-card" onClick={() => onSelect?.(product)}><div className="product-card-link"><div className="product-photo">{image && <img src={image} alt={name} />}<span className="product-category">{product.kategori?.namaKategori || 'Produk'}</span></div><div className="product-info"><h3>{name}</h3><p>{product.deskripsi}</p><div className="product-bottom"><strong>{formatPrice(product.harga)}</strong></div></div></div><a className="product-order-btn" href={waLink(`Halo, saya ingin memesan ${name}`)} onClick={(event) => event.stopPropagation()}>Pesan <span>↗</span></a></article>
}
