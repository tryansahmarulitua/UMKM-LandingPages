import { Link } from 'react-router-dom'
import { ProductImage } from '../ui/ProductCard'
import FlavourTags from '../ui/FlavourTags'
import { formatPrice } from '../../utils/formatters'

// A product the assistant recommended. Name, price and photo come from the database, not from the AI.
export default function ChatProductCard({ product, onOpen }) {
  return (
    <Link
      to={`/produk/${product.idProduk}`}
      onClick={onOpen}
      className="flex items-center gap-3 rounded-xl border border-line bg-white p-2 transition-shadow hover:shadow-md"
    >
      <ProductImage product={product} className="size-14 shrink-0 rounded-lg [&_svg]:size-6" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{product.namaProduk}</span>
        <span className="block text-sm">{formatPrice(product.harga)}</span>
        <FlavourTags product={product} className="mt-1" />
      </span>
    </Link>
  )
}
