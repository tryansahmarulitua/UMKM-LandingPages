const shimmer = 'animate-shimmer bg-[linear-gradient(90deg,#e8e9e1_25%,#f1f2eb_37%,#e8e9e1_63%)] bg-[length:400%_100%]'

function ProductSkeleton({ className = '' }) {
  return (
    <article className={`overflow-hidden rounded-lg bg-white ${className}`} aria-hidden="true">
      <div className={`h-[190px] ${shimmer}`} />
      <div className="flex h-[174px] flex-col gap-3.5 px-[22px] py-6">
        <div className={`h-[18px] w-[58%] rounded ${shimmer}`} />
        <div className={`h-3.5 w-[82%] rounded ${shimmer}`} />
        <div className={`mt-auto h-[18px] w-[35%] rounded ${shimmer}`} />
      </div>
    </article>
  )
}

const status = { role: 'status', 'aria-live': 'polite' }

export function HeroImageSkeleton() {
  return <div className={`h-full ${shimmer}`} {...status} aria-label="Memuat data..." />
}

export function ProductGridSkeleton() {
  return (
    <div className="mx-auto mt-[30px] mb-[100px] grid max-w-[1180px] grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4" {...status} aria-label="Memuat produk...">
      {Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={index} />)}
    </div>
  )
}

export function ProductSliderSkeleton() {
  return (
    <div className="mx-auto mt-10 mb-[115px] flex max-w-[1180px] gap-[22px] overflow-x-auto pb-3.5" {...status} aria-label="Memuat produk...">
      {Array.from({ length: 4 }, (_, index) => <ProductSkeleton key={index} className="min-w-[270px] flex-[0_0_270px]" />)}
    </div>
  )
}
