/**
 * Barrel file do módulo de Autenticação.
 * Centraliza todas as exportações da feature: API, componentes, contexto, páginas, queries e schemas.
 */

export * from './api/userService'

export * from './components/LoginLoadingScreen'
export * from './components/ProtectedRoute'

export * from './contexts/AuthContext'

export { default as LoginPage } from './pages/LoginPage'
export { default as RegisterFormPage } from './pages/RegisterFormPage'
export { default as RegisterPage } from './pages/RegisterPage'

export * from './queries/useLoginMutation'
export * from './queries/useLogoutMutation'
export * from './queries/useRegisterMutation'

export * from './utils/loginSchema'
export * from './utils/registerSchema'
