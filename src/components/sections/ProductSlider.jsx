import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../../services/api'
import { formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'
import CategoryBadge from '../ui/CategoryBadge'
import EmptyState from '../ui/EmptyState'
import { ProductSliderSkeleton } from '../ui/LoadingState'
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

  if (loading) return <ProductSliderSkeleton />

  return (
    <section id="produk" className="wrapper pb-[115px]">
      <div className="mb-[30px] flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-[18px]">
        <div>
          <p className="eyebrow">Koleksi pilihan</p>
          <h2 className="display m-0 text-[44px] max-md:text-[36px]">Produk <em className="accent">unggulan.</em></h2>
        </div>
        <Link className="text-link" to="/produk">Lihat semua <span>↗</span></Link>
      </div>
      {shuffled.length === 0 ? (
        <EmptyState>Tidak ada produk yang ditampilkan saat ini.</EmptyState>
      ) : (
        <div
          className="flex cursor-grab gap-[22px] overflow-x-auto pb-3.5 select-none [scrollbar-width:thin]"
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
                className="min-w-[270px] flex-[0_0_270px] overflow-hidden rounded-lg bg-white max-md:min-w-[min(82vw,300px)] max-md:basis-[min(82vw,300px)]"
                key={product.idProduk}
                onClick={() => setSelectedProduct(product)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(product)}
                role="button"
                tabIndex={0}
              >
                <div className="relative h-[190px] bg-mist max-md:h-[200px]">
                  {image && <img className="size-full object-cover" src={image} alt={name} loading="lazy" decoding="async" draggable="false" />}
                  <CategoryBadge product={product} />
                </div>
                <div className="px-[17px] py-[15px]">
                  <h3 className="mb-4 text-[15px]">{name}</h3>
                  <div className="flex items-center justify-between text-[12px]">
                    <strong>{formatPrice(product.harga)}</strong>
                    {order && (
                      <a className="font-bold" href={order} onClick={(e) => e.stopPropagation()}>
                        Pesan <span className="ml-1.5 text-[#9db631]">↗</span>
                      </a>
                    )}
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
