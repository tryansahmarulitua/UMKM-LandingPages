import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Store } from 'lucide-react'
import { assetUrl } from '../../services/api'
import { business, FACTS } from '../../content'
import { askLink } from '../../utils/whatsapp'

export default function HeroSection({ profile, loading }) {
  const { name, area, description } = business(profile)
  const image = assetUrl(profile?.foto)
  const wa = askLink(profile?.noTelepon)

  return (
    <section className="wrapper grid items-center gap-8 py-8 md:grid-cols-2 md:gap-12 md:py-16">
      <div>
        <p className="inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4 text-brand" aria-hidden="true" /> {area}
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">{name}</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" to="/produk">Lihat katalog</Link>
          {wa && (
            <a className="btn btn-outline" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Tanya lewat WhatsApp
            </a>
          )}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {FACTS.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon className="size-4 text-brand" aria-hidden="true" /> {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-mist max-md:-order-1">
        {loading
          ? <div className="skeleton size-full" role="status" aria-label="Memuat gambar..." />
          : image
            ? <img className="size-full object-cover" src={image} alt={name} fetchPriority="high" />
            : <div className="grid size-full place-items-center"><Store className="size-14 text-muted/30" aria-hidden="true" /></div>}
      </div>
    </section>
  )
}
