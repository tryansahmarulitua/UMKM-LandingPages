import { Link, useParams } from 'react-router-dom'
import { assetUrl } from '../services/api'
import { BUSINESS_NAME, categoryName, formatPrice } from '../utils/formatters'
import { orderLink } from '../utils/whatsapp'

const page = 'wrapper pt-[133px] pb-[100px] max-md:pt-[105px]'

export default function ProductDetailPage({ products = [], phone }) {
  const { id } = useParams()
  const product = products.find((item) => String(item.idProduk) === id)

  if (!product) {
    return (
      <main className={page}>
        <p>Produk tidak ditemukan.</p>
        <Link className="btn" to="/produk">Kembali ke produk</Link>
      </main>
    )
  }

  const name = product.namaProduk
  const image = assetUrl(product.foto)
  const order = orderLink(phone, name)

  return (
    <main className={page}>
      <Link className="mb-7 inline-block text-[13px] text-muted" to="/produk">← Kembali ke produk</Link>
      <article className="grid grid-cols-2 gap-[70px] overflow-hidden rounded-[10px] bg-white max-md:grid-cols-1 max-md:gap-0">
        <div className="min-h-[480px] bg-mist max-md:min-h-[280px]">
          {image && <img className="size-full object-cover" src={image} alt={name} />}
        </div>
        <div className="flex flex-col items-start px-[55px] py-[60px] max-md:px-[22px] max-md:py-[30px]">
          <p className="eyebrow">{categoryName(product)}</p>
          <h1 className="mb-5 text-[52px] tracking-[-2px] max-md:text-[38px]">{name}</h1>
          <p className="leading-[1.7] text-muted">{product.deskripsi || `Produk pilihan ${BUSINESS_NAME}.`}</p>
          <strong className="my-[25px] text-[22px]">{formatPrice(product.harga)}</strong>
          {order && <a className="btn" href={order}>Pesan sekarang <span>↗</span></a>}
        </div>
      </article>
    </main>
  )
}
