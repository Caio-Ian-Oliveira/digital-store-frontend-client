/**
 * Barrel file do módulo de Carrinho de Compras.
 * Exporta componentes, contexto, páginas e tipagens do carrinho.
 */

// Componentes
export { CartItem } from './components/CartItem'
export * from './components/CartModal'
export * from './components/CartSummary'
export * from './components/CouponSection'
export * from './components/EmptyCart'
export * from './components/ShippingSection'

// Contexto global do carrinho
export * from './contexts/CartContext'

// Páginas
export { default as CartPage } from './pages/CartPage'

// Tipagens
export type { CartItem as CartItemType } from './types/CartItem'
