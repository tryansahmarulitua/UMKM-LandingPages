import { Link } from 'react-router-dom'
import { CircleCheck, MessageCircle } from 'lucide-react'
import { formatPrice } from '../../utils/formatters'
import { pesanWhatsApp } from '../../utils/keranjang'
import { waLink } from '../../utils/whatsapp'

// Shown after checkout: order number, summary, transfer details, and the WhatsApp button (Project Plan §1.1).
export default function PesananBerhasil({ pesanan, onSelesai }) {
  const wa = waLink(pesanan.whatsapp, pesanWhatsApp(pesanan))
  const { namaBank, nomorRekening, atasNama } = pesanan.pembayaran ?? {}

  return (
    <main className="wrapper max-w-2xl py-8 md:py-12">
      <div className="flex items-start gap-3">
        <CircleCheck className="mt-1 size-7 shrink-0 text-brand" aria-hidden="true" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Pesanan berhasil dibuat</h1>
          <p className="mt-1 text-muted">Nomor pesanan <strong className="text-ink">{pesanan.nomorPesanan}</strong></p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-line bg-white p-5">
        <h2 className="font-semibold">Ringkasan</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {pesanan.items.map((item) => (
            <li key={item.namaProduk} className="flex justify-between gap-3">
              <span>{item.namaProduk} ×{item.jumlah}</span>
              <span className="tabular-nums">{formatPrice(item.subtotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-line pt-3">
          <span className="font-semibold">Total</span>
          <strong className="tabular-nums">{formatPrice(pesanan.total)}</strong>
        </div>
        <p className="mt-2 text-sm text-muted">Pengiriman: {pesanan.pengiriman}{pesanan.pengiriman === 'Dikirim' ? ' (ongkos kirim dikonfirmasi lewat WhatsApp)' : ''}</p>
      </section>

      <section className="mt-4 rounded-xl border border-brand/30 bg-brand-soft/60 p-5">
        <h2 className="font-semibold">Cara bayar</h2>
        {nomorRekening ? (
          <p className="mt-2 text-sm leading-relaxed">
            Transfer <strong>{formatPrice(pesanan.total)}</strong> ke <strong>{namaBank}</strong> {' '}
            <strong className="tabular-nums">{nomorRekening}</strong>{atasNama && <> a.n. <strong>{atasNama}</strong></>}.
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed">Nomor rekening akan dikirim penjual lewat WhatsApp.</p>
        )}
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
          <li>Tekan tombol di bawah untuk mengirim pesanan ke WhatsApp penjual.</li>
          <li>Kirim bukti transfer di chat WhatsApp tersebut.</li>
          <li>Penjual menandai pesanan sebagai Lunas setelah memeriksa bukti transfer.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">Pesanan yang belum dibayar dalam 24 jam otomatis dibatalkan.</p>
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {wa ? (
          <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" /> Kirim ke WhatsApp
          </a>
        ) : (
          <p className="text-sm text-muted">Nomor WhatsApp penjual belum tersedia. Simpan nomor pesanan di atas.</p>
        )}
        <Link className="btn btn-outline" to="/produk" onClick={onSelesai}>Belanja lagi</Link>
      </div>
    </main>
  )
}
