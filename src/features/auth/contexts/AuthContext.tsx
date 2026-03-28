import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { CONFIG } from '@/core'

export interface User {
  id: string
  firstname: string
  surname: string
  cpf: string
  phone: string
  email: string
  address?: string
  neighborhood?: string
  city?: string
  state?: string
  cep?: string
  complement?: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  isInitialLoading: boolean
  logout: () => void
}

/**
 * Contexto de Autenticação da Digital Store.
 * Centraliza o estado do usuário logado, persistência no localStorage
 * e métodos de login/logout para toda a aplicação.
 *
 * Consumido exclusivamente através do hook `useAuth()`.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provider que envolve a aplicação para prover dados de autenticação.
 * Restaura a sessão do localStorage no primeiro render e sincroniza
 * automaticamente sempre que o estado do usuário mudar.
 *
 * @param children - Árvore React a ser envolvida.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Sincronização inicial com o localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.warn('Erro ao restaurar usuário', e)
      }
    }
    setIsInitialLoading(false)
  }, [])

  // Atualiza o localStorage sempre que o objeto user mudar
  useEffect(() => {
    // Evita rodar antes do loading inicial estar pronto para não limpar o storage acidentalmente
    if (isInitialLoading) return

    try {
      if (user) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(user))
      } else {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER)
      }
    } catch (e) {
      console.warn('Erro ao acessar localStorage', e)
    }
  }, [user, isInitialLoading])

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isInitialLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook customizado para acessar os dados e funções de autenticação.
 *
 * @returns {AuthContextType} Objeto com `user`, `setUser`, `isAuthenticated`, `isInitialLoading` e `logout`.
 * @throws {Error} Se usado fora de um `<AuthProvider />`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
