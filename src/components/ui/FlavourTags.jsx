import { flavourNames } from '../../utils/formatters'

// Flavour labels (Manis, Pedas, ...) as small chips; renders nothing when the product has none.
export default function FlavourTags({ product, className = '' }) {
  const names = flavourNames(product)
  if (names.length === 0) return null

  return (
    <ul className={`flex flex-wrap gap-1 ${className}`} aria-label="Rasa">
      {names.map((name) => (
        <li key={name} className="rounded-full bg-mist px-2 py-0.5 text-xs text-ink/80">{name}</li>
      ))}
    </ul>
  )
}
