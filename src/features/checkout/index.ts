/**
 * Barrel file do módulo de Checkout.
 * Exporta componentes de formulário e a página de finalização de compra.
 */

// Componentes
export * from './components/CheckoutProductItem'
export * from './components/CheckoutSummary'
export * from './components/DeliveryAddressSection'
export * from './components/PaymentMethodSection'
export * from './components/PersonalInfoSection'

// Páginas
export { default as CheckoutPage } from './pages/CheckoutPage'
