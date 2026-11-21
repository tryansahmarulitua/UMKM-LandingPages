import { categoryName } from '../../utils/formatters'

export default function CategoryBadge({ product }) {
  return (
    <span className="absolute top-[13px] left-[13px] rounded-[3px] bg-white px-2.5 py-1.5 text-[10px]">
      {categoryName(product)}
    </span>
  )
}
