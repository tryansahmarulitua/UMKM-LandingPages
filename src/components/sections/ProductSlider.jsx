import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../../services/api'
import { categoryName, formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'
import LoadingState from '../ui/LoadingState'
import ProductModal from '../ui/ProductModal'

function shuffle(items) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function ProductSlider({ products, phone, loading }) {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, x: 0, scrollLeft: 0 })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const shuffled = useMemo(() => shuffle(products), [products])

  const startDrag = (e) => {
    drag.current = { active: true, x: e.pageX, scrollLeft: trackRef.current.scrollLeft }
    trackRef.current.style.cursor = 'grabbing'
  }
  const moveDrag = (e) => {
    if (!drag.current.active) return
    trackRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.x)
  }
  const endDrag = () => {
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
        <Link className="text-link" to="/produk">Lihat semua <span>↗</span></Link>
      </div>
      {shuffled.length === 0 ? (
        <p className="slider-empty">Tidak ada produk yang ditampilkan saat ini.</p>
      ) : (
        <div
          className="slider-track"
          ref={trackRef}
          onMouseDown={startDrag}
          onMouseMove={moveDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {shuffled.map((product) => {
            const name = product.namaProduk
            const image = assetUrl(product.foto)
            const order = orderLink(phone, name)
            return (
              <div
                className="slider-card"
                key={product.idProduk}
                onClick={() => setSelectedProduct(product)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(product)}
                role="button"
                tabIndex={0}
              >
                <div className="slider-photo">
                  {image && <img src={image} alt={name} loading="lazy" decoding="async" draggable="false" />}
                  <span className="product-category">{categoryName(product)}</span>
                </div>
                <div className="slider-info">
                  <h3>{name}</h3>
                  <div className="slider-bottom">
                    <strong>{formatPrice(product.harga)}</strong>
                    {order && <a href={order} onClick={(e) => e.stopPropagation()}>Pesan <span>↗</span></a>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <ProductModal product={selectedProduct} phone={phone} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
