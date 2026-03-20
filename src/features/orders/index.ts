/**
 * Barrel file do módulo de Pedidos.
 * Exporta páginas, tipagens e utilitários de status dos pedidos.
 */

// Páginas
export { default as MyOrdersPage } from './pages/MyOrdersPage'
export { default as OrderDetailPage } from './pages/MyOrdersPage/OrderDetailPage'
export { default as OrderSuccessPage } from './pages/OrderSuccessPage'

// Tipagens e utilitários
export * from './types/Order'
export * from './utils/orderStatus'
