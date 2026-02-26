import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { api } from '@/lib/api'

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Essa é uma verificação simulada. O Frontend pinga uma rota segura
    // (ex: buscar perfil) pra ver se o backend aceita o cookie.
    const verifySession = async () => {
      try {
        // Ping inicial no backend. A rota exata de validação
        // deve ser ajustada (`/v1/user/search` ou `/v1/user/me`)
        await api.get('/user/search?limit=1')
        setIsAuthenticated(true)
      } catch {
        setIsAuthenticated(false)
      }
    }

    verifySession()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="flex-1 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  // Se a verificação bateu 401 no backend ou similar, voltamos pro login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se tudo certo, renderiza as telas filhas da rota!
  return <Outlet />
}
