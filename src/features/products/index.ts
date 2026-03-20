/**
 * Barrel file do módulo de Produtos.
 * Exporta componentes, dados estáticos, páginas, serviços HTTP e tipagens.
 */

// Componentes
export * from './components/BuyBox'
export * from './components/FilterGroup'
export * from './components/ProductCard'
export * from './components/ProductOptions'

// Dados estáticos
export * from './data/categories'

// Páginas
export { default as CategoryPage } from './pages/CategoryPage'
export { default as ProductListingPage } from './pages/ProductListingPage'
export { default as ProductViewPage } from './pages/ProductViewPage'

// Serviços HTTP e tipagens
export * from './services/productService'
export * from './types/Product'
