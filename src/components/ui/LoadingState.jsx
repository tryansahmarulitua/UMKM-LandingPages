function ProductSkeleton() {
  return (
    <article className="product-skeleton" aria-hidden="true">
      <div className="skeleton skeleton-product-photo" />
      <div className="product-skeleton-info">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-description" />
        <div className="skeleton skeleton-price" />
      </div>
    </article>
  )
}

const LISTS = {
  products: { className: 'product-grid skeleton-products', count: 6 },
  slider: { className: 'slider-track skeleton-slider', count: 4 },
}

export default function LoadingState({ type = 'content' }) {
  const list = LISTS[type]
  if (!list) {
    return <div className={`skeleton skeleton-${type}`} role="status" aria-label="Memuat data..." aria-live="polite" />
  }

  return (
    <div className={list.className} role="status" aria-label="Memuat produk..." aria-live="polite">
      {Array.from({ length: list.count }, (_, index) => <ProductSkeleton key={index} />)}
    </div>
  )
}
