import { ORDER_STEPS } from '../../content'

export default function OrderSteps() {
  return (
    <section className="wrapper py-12 md:py-16" aria-labelledby="cara-pesan">
      <h2 id="cara-pesan" className="text-2xl font-bold tracking-tight">Cara pesan</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {ORDER_STEPS.map(({ title, text }, index) => (
          <li key={title} className="flex gap-4 rounded-xl border border-line bg-white p-5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{index + 1}</span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
