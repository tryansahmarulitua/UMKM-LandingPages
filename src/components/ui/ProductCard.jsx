import { assetUrl } from '../../services/api'
import { formatPrice } from '../../utils/formatters'
import { orderLink } from '../../utils/whatsapp'
import CategoryBadge from './CategoryBadge'

export default function ProductCard({ product, phone, onSelect }) {
  const name = product.namaProduk
  const image = assetUrl(product.foto)
  const order = orderLink(phone, name)

  return (
    <article
      className="relative cursor-pointer overflow-hidden rounded-lg bg-white transition-[translate,box-shadow] duration-200 ease-[ease] hover:-translate-y-[3px] hover:shadow-[0_12px_28px_#18231e12]"
      onClick={() => onSelect?.(product)}
    >
      <div className="group">
        <div className="relative h-[220px] overflow-hidden bg-mist max-md:h-[230px]">
          {image && <img className="size-full object-cover" src={image} alt={name} loading="lazy" decoding="async" />}
          <CategoryBadge product={product} />
        </div>
        <div className="px-[18px] pt-[17px] pb-[19px]">
          <h3 className="mb-[7px] text-[16px] font-medium group-hover:underline">{name}</h3>
          <p className="h-[34px] min-h-5 text-[11px] leading-[1.5] text-muted">{product.deskripsi}</p>
          <div className="absolute inset-x-[22px] bottom-[22px] mt-4 flex items-end justify-between max-md:inset-x-[18px]">
            <strong className="text-[14px]">{formatPrice(product.harga)}</strong>
          </div>
        </div>
      </div>
      {order && (
        <a
          className="absolute right-[22px] bottom-[22px] text-[13px] font-bold max-md:right-[18px]"
          href={order}
          onClick={(event) => event.stopPropagation()}
        >
          Pesan <span>↗</span>
        </a>
      )}
    </article>
  )
}
