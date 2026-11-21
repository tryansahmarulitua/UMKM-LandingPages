import { useEffect, useRef, useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { useKeranjang } from '../../hooks/useKeranjang'
import { MAKS_PRODUK } from '../../utils/keranjang'

// "+ Keranjang" button. Shows a short confirmation after adding.
export default function AddToCartButton({ product, className = '', label = '+ Keranjang' }) {
  const { items, tambah } = useKeranjang()
  const [ditambahkan, setDitambahkan] = useState(false)
  const timer = useRef(null)
  const penuh = items.length >= MAKS_PRODUK && !items.some((item) => item.idProduk === product.idProduk)

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleClick() {
    tambah(product.idProduk)
    setDitambahkan(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDitambahkan(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={penuh}
      title={penuh ? `Maksimal ${MAKS_PRODUK} jenis produk per pesanan` : undefined}
      aria-label={`Tambah ${product.namaProduk} ke keranjang`}
      className={`disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {ditambahkan
        ? <><Check className="size-4" aria-hidden="true" /> Ditambahkan</>
        : <>{label.startsWith('+') ? null : <ShoppingBag className="size-4" aria-hidden="true" />}{label}</>}
      <span className="sr-only" aria-live="polite">{ditambahkan ? `${product.namaProduk} ditambahkan ke keranjang` : ''}</span>
    </button>
  )
}
