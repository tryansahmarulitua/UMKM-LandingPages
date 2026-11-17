import { Link, useParams } from 'react-router-dom'
import { assetUrl } from '../services/api'
import { formatPrice } from '../utils/formatters'
import { waLink } from '../utils/whatsapp'

export default function ProductDetailPage({ products = [] }) {
  const { id } = useParams()
  const product = products.find((item) => String(item.idProduk) === id)

  if (!product) return <main className="detail-page container"><p>Produk tidak ditemukan.</p><Link className="button button-dark" to="/produk">Kembali ke produk</Link></main>

  const image = assetUrl(product.foto)
  const name = product.namaProduk
  return <main className="detail-page container"><Link className="back-link" to="/produk">← Kembali ke produk</Link><article className="product-detail"><div className="product-detail-photo">{image && <img src={image} alt={name} />}</div><div className="product-detail-info"><p className="eyebrow">{product.kategori?.namaKategori || 'Produk'}</p><h1>{name}</h1><p>{product.deskripsi || 'Produk pilihan UMKM Jatisampurna.'}</p><strong className="product-detail-price">{formatPrice(product.harga)}</strong><a className="button button-dark" href={waLink(`Halo, saya ingin memesan ${name}`)}>Pesan sekarang <span>↗</span></a></div></article></main>
}
