import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { ProductImage } from '../components/ui/ProductCard'
import EmptyState from '../components/ui/EmptyState'
import Turnstile from '../components/ui/Turnstile'
import PesananBerhasil from '../components/order/PesananBerhasil'
import { useKeranjang } from '../hooks/useKeranjang'
import { createOrder } from '../services/api'
import { formatPrice } from '../utils/formatters'
import { MAKS_JUMLAH, nomorWhatsAppValid, rincianKeranjang } from '../utils/keranjang'

const KUNCI_PESANAN = 'pesanan-terakhir'
const INPUT = 'mt-1 h-11 w-full rounded-lg border border-line bg-white px-3 text-base outline-none focus:border-ink sm:text-sm'

// The confirmation survives a reload for this tab only, so the transfer details are not lost.
const pesananTersimpan = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KUNCI_PESANAN) ?? 'null')
  } catch {
    return null
  }
}

const pesanPertama = (errors) => Object.values(errors ?? {}).flat()[0]

export default function KeranjangPage({ products, loading }) {
  const { items, ubah, kosongkan } = useKeranjang()
  const [form, setForm] = useState({ namaPelanggan: '', noWhatsApp: '', pengiriman: 'Ambil sendiri' })
  const [mengirim, setMengirim] = useState(false)
  const [error, setError] = useState('')
  const [pesanan, setPesanan] = useState(pesananTersimpan)
  const [token, setToken] = useState(null)
  const [widgetKey, setWidgetKey] = useState(0)
  const [website, setWebsite] = useState('') // honeypot, hidden from people

  const { baris, total } = rincianKeranjang(items, products)

  function selesai() {
    sessionStorage.removeItem(KUNCI_PESANAN)
    setPesanan(null)
  }

  async function checkout(event) {
    event.preventDefault()
    if (!nomorWhatsAppValid(form.noWhatsApp)) {
      setError('Nomor WhatsApp tidak valid. Contoh: 081234567890.')
      return
    }
    if (!token) {
      setError('Selesaikan verifikasi keamanan dulu.')
      return
    }
    setMengirim(true)
    setError('')
    try {
      // Only IDs and quantities are sent; the server calculates every price and the total.
      const { ok, data } = await createOrder({
        ...form,
        turnstile: token,
        website,
        items: baris.map((row) => ({ idProduk: row.product.idProduk, jumlah: row.jumlah })),
      })
      if (!ok) {
        setError(pesanPertama(data.errors) || data.message || 'Pesanan belum bisa dibuat. Coba lagi.')
        return
      }
      sessionStorage.setItem(KUNCI_PESANAN, JSON.stringify(data))
      setPesanan(data)
      kosongkan()
      window.scrollTo(0, 0)
    } catch {
      setError('Gagal menghubungi server. Periksa koneksi lalu coba lagi.')
    } finally {
      setMengirim(false)
      // The token may have been used; get a fresh one for the next attempt.
      setToken(null)
      setWidgetKey((k) => k + 1)
    }
  }

  if (pesanan) return <PesananBerhasil pesanan={pesanan} onSelesai={selesai} />

  return (
    <main className="wrapper py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight">Keranjang</h1>

      {loading ? (
        <div className="skeleton mt-6 h-40 rounded-xl" role="status" aria-label="Memuat keranjang..." />
      ) : baris.length === 0 ? (
        <div className="mt-6 space-y-4">
          <EmptyState>Keranjang masih kosong.</EmptyState>
          <Link className="btn btn-primary" to="/produk"><ShoppingBag className="size-4" aria-hidden="true" /> Lihat katalog</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {baris.map(({ product, jumlah, subtotal }) => (
              <li key={product.idProduk} className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                <ProductImage product={product} className="size-20 shrink-0 rounded-lg [&_svg]:size-6" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link to={`/produk/${product.idProduk}`} className="truncate font-semibold hover:underline">{product.namaProduk}</Link>
                  <p className="text-sm text-muted">{formatPrice(product.harga)}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center rounded-full border border-line">
                      <button type="button" className="grid size-9 cursor-pointer place-items-center" onClick={() => ubah(product.idProduk, jumlah - 1)} aria-label={`Kurangi ${product.namaProduk}`}>
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-label="Jumlah">{jumlah}</span>
                      <button type="button" className="grid size-9 cursor-pointer place-items-center disabled:cursor-not-allowed disabled:opacity-30" onClick={() => ubah(product.idProduk, jumlah + 1)} disabled={jumlah >= MAKS_JUMLAH} aria-label={`Tambah ${product.namaProduk}`}>
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm tabular-nums">{formatPrice(subtotal)}</strong>
                      <button type="button" className="grid size-9 cursor-pointer place-items-center rounded-full text-muted hover:bg-mist hover:text-ink" onClick={() => ubah(product.idProduk, 0)} aria-label={`Hapus ${product.namaProduk}`}>
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <form className="space-y-4 rounded-xl border border-line bg-white p-5" onSubmit={checkout}>
            <h2 className="text-lg font-semibold">Data pemesan</h2>
            <p className="text-sm text-muted">Tanpa perlu membuat akun.</p>
            <label className="block text-sm font-medium">
              Nama
              <input className={INPUT} value={form.namaPelanggan} onChange={(e) => setForm({ ...form, namaPelanggan: e.target.value })} required maxLength={100} autoComplete="name" />
            </label>
            <label className="block text-sm font-medium">
              Nomor WhatsApp
              <input className={INPUT} value={form.noWhatsApp} onChange={(e) => setForm({ ...form, noWhatsApp: e.target.value })} required maxLength={20} type="tel" inputMode="tel" autoComplete="tel" placeholder="081234567890" />
            </label>
            <fieldset>
              <legend className="text-sm font-medium">Pengiriman</legend>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {['Ambil sendiri', 'Dikirim'].map((pilihan) => (
                  <label key={pilihan} className={`flex h-11 cursor-pointer items-center justify-center rounded-lg border text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink ${form.pengiriman === pilihan ? 'border-ink bg-ink text-white' : 'border-line'}`}>
                    <input type="radio" name="pengiriman" value={pilihan} checked={form.pengiriman === pilihan} onChange={() => setForm({ ...form, pengiriman: pilihan })} className="sr-only" />
                    {pilihan}
                  </label>
                ))}
              </div>
              {form.pengiriman === 'Dikirim' && <p className="mt-2 text-xs text-muted">Alamat dan ongkos kirim dikonfirmasi lewat WhatsApp setelah checkout.</p>}
            </fieldset>
            <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              Website
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" />
            </label>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="text-muted">Total</span>
              <strong className="text-xl tabular-nums">{formatPrice(total)}</strong>
            </div>
            {error && <p className="rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand-dark" role="alert">{error}</p>}
            <Turnstile key={widgetKey} onToken={setToken} />
            <button type="submit" className="btn btn-primary w-full" disabled={mengirim || !token}>{mengirim ? 'Memproses...' : 'Buat pesanan'}</button>
            <p className="text-xs leading-relaxed text-muted">Pembayaran lewat transfer. Pesanan yang belum dibayar dalam 24 jam otomatis dibatalkan.</p>
          </form>
        </div>
      )}
    </main>
  )
}
