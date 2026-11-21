import { Mail, MapPin, MessageCircle } from 'lucide-react'
import OrderSteps from '../components/sections/OrderSteps'
import InstagramIcon from '../components/ui/InstagramIcon'
import { assetUrl } from '../services/api'
import { BUSINESS_AREA, BUSINESS_DESCRIPTION, BUSINESS_NAME, FACTS } from '../content'
import { httpUrl, socialLabel } from '../utils/url'
import { waLink } from '../utils/whatsapp'

export default function AboutPage({ profile }) {
  const name = profile?.namaUMKM || BUSINESS_NAME
  const phone = profile?.noTelepon
  const wa = waLink(phone, `Halo ${name}, saya ingin bertanya`)
  const email = profile?.email
  const socials = httpUrl(profile?.mediaSosial)
  const image = assetUrl(profile?.foto)

  const contacts = [
    { icon: MapPin, label: profile?.alamat || BUSINESS_AREA },
    wa && { icon: MessageCircle, label: phone, href: wa, external: true },
    email && { icon: Mail, label: email, href: `mailto:${email}` },
    socials && { icon: InstagramIcon, label: socialLabel(socials), href: socials, external: true },
  ].filter(Boolean)

  return (
    <main>
      <section className="wrapper grid gap-8 py-8 md:grid-cols-[1.4fr_1fr] md:gap-12 md:py-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tentang {name}</h1>
          {image && <img className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" src={image} alt={name} />}
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{profile?.deskripsi || BUSINESS_DESCRIPTION}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {FACTS.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm">
                <Icon className="size-4 text-brand" aria-hidden="true" /> {label}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="font-semibold">Kontak</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {contacts.map(({ icon: Icon, label, href, external }) => {
              const content = <><Icon className="size-4 shrink-0 text-brand" aria-hidden="true" /><span className="break-all">{label}</span></>
              return (
                <li key={label}>
                  {href
                    ? <a className="flex items-center gap-3 hover:underline" href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>{content}</a>
                    : <span className="flex items-center gap-3">{content}</span>}
                </li>
              )
            })}
          </ul>
          {wa && (
            <a className="btn btn-primary mt-6 w-full" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat via WhatsApp
            </a>
          )}
        </aside>
      </section>
      <OrderSteps />
    </main>
  )
}
