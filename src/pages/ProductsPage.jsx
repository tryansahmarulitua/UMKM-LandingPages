import ProductsSection from '../components/sections/ProductsSection'

export default function ProductsPage({ products, loading }) {
  return <ProductsSection products={products} loading={loading} />
}
