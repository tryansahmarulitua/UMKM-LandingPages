/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { bacaKeranjang, tambahItem, ubahJumlah } from '../utils/keranjang'

const KUNCI = 'keranjang-bunda-riris'
const KeranjangContext = createContext(null)

// Cart kept in localStorage, so it survives a reload. It only holds product IDs and quantities.
export function KeranjangProvider({ children }) {
  const [items, setItems] = useState(() => bacaKeranjang(localStorage.getItem(KUNCI)))

  useEffect(() => {
    localStorage.setItem(KUNCI, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => ({
    items,
    jumlahBarang: items.reduce((sum, item) => sum + item.jumlah, 0),
    tambah: (idProduk, jumlah = 1) => setItems((prev) => tambahItem(prev, idProduk, jumlah)),
    ubah: (idProduk, jumlah) => setItems((prev) => ubahJumlah(prev, idProduk, jumlah)),
    kosongkan: () => setItems([]),
  }), [items])

  return <KeranjangContext.Provider value={value}>{children}</KeranjangContext.Provider>
}

export function useKeranjang() {
  return useContext(KeranjangContext)
}
