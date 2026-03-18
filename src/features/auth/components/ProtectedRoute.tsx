import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Componente de proteção de rotas.
 * Verifica se o usuário está autenticado.
 * Se sim, renderiza o conteúdo da rota (Outlet).
 * Caso contrário, redireciona para a página de Login.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
