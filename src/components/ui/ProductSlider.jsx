import { useMemo, useRef, useState } from 'react'
import { formatPrice } from '../../utils/formatters'
import { waLink } from '../../utils/whatsapp'
import { assetUrl } from '../../services/api'
import LoadingState from './LoadingState'
import ProductModal from './ProductModal'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ProductSlider({ products, loading }) {
  const trackRef = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const random = useMemo(() => shuffle(products), [products])

  /* drag-to-scroll */
  const drag = useRef({ active: false, x: 0, sl: 0 })
  const onDown = (e) => {
    drag.current = { active: true, x: e.pageX, sl: trackRef.current.scrollLeft }
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMove = (e) => {
    if (!drag.current.active) return
    trackRef.current.scrollLeft = drag.current.sl - (e.pageX - drag.current.x)
  }
  const onUp = () => {
    drag.current.active = false
    trackRef.current.style.cursor = 'grab'
  }

  if (loading) return <LoadingState type="slider" />

  return (
    <section id="produk" className="slider-section container">
      <div className="slider-heading">
        <div>
          <p className="eyebrow">Koleksi pilihan</p>
          <h2>Produk <em>unggulan.</em></h2>
        </div>
        <a className="text-link" href="/produk">Lihat semua <span>↗</span></a>
      </div>
      {random.length === 0 ? (
        <p className="slider-empty">Tidak ada produk yang ditampilkan saat ini.</p>
      ) : (
        <div
          className="slider-track"
          ref={trackRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
        >
          {random.map((product) => {
            const name  = product.namaProduk
            const image = assetUrl(product.foto)
            return (
              <div className="slider-card" key={product.idProduk} onClick={() => setSelectedProduct(product)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(product)}>
                <div className="slider-photo">
                  {image && <img src={image} alt={name} draggable="false" />}
                  <span className="product-category">{product.kategori?.namaKategori || 'Produk'}</span>
                </div>
                <div className="slider-info">
                  <h3>{name}</h3>
                  <div className="slider-bottom">
                    <strong>{formatPrice(product.harga)}</strong>
                    <a href={waLink(`Halo, saya ingin memesan ${name}`)}>Pesan <span>↗</span></a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
