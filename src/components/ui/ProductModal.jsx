import { assetUrl } from '../../services/api'
import { formatPrice } from '../../utils/formatters'
import { waLink } from '../../utils/whatsapp'

export default function ProductModal({ product, onClose }) {
  if (!product) return null
  const image = assetUrl(product.foto)
  const name = product.namaProduk
  return <div className="product-modal-backdrop" onClick={onClose}><article className="product-modal" role="dialog" aria-modal="true" aria-label={name} onClick={(event) => event.stopPropagation()}><button className="product-modal-close" onClick={onClose} aria-label="Tutup">×</button><div className="product-modal-photo">{image && <img src={image} alt={name} />}</div><div className="product-modal-info"><p className="eyebrow">{product.kategori?.namaKategori || 'Produk'}</p><h2>{name}</h2><p>{product.deskripsi || 'Produk pilihan UMKM Jatisampurna.'}</p><strong>{formatPrice(product.harga)}</strong><a className="button button-dark" href={waLink(`Halo, saya ingin memesan ${name}`)}>Pesan sekarang <span>↗</span></a></div></article></div>
}
