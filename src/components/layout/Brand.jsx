import { Link } from 'react-router-dom'

export default function Brand({ name, className = '' }) {
  return (
    <Link className={`flex items-center gap-2.5 text-[20px] font-bold tracking-[-.6px] ${className}`} to="/">
      <span className="grid size-[31px] place-items-center rounded-full bg-ink font-['Georgia'] text-[22px] text-lime italic">
        {name[0]}
      </span>
      <span>{name}<span className="text-leaf-bright">.</span></span>
    </Link>
  )
}
