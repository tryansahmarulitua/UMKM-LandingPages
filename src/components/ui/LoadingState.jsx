function ProductSkeleton() {
  return <article className="product-skeleton" aria-hidden="true"><div className="skeleton skeleton-product-photo" /><div className="product-skeleton-info"><div className="skeleton skeleton-title" /><div className="skeleton skeleton-description" /><div className="skeleton skeleton-price" /></div></article>
}

export default function LoadingState({ type = 'content' }) {
  if (type === 'products') return <div className="product-grid skeleton-products" role="status" aria-label="Memuat produk..." aria-live="polite">{Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={index} />)}</div>
  if (type === 'slider') return <div className="slider-track skeleton-slider" role="status" aria-label="Memuat produk..." aria-live="polite">{Array.from({ length: 4 }, (_, index) => <ProductSkeleton key={index} />)}</div>
  return <div className={`skeleton skeleton-${type}`} role="status" aria-label="Memuat data..." aria-live="polite" />
}
