import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import { CartProvider } from './features/cart/contexts/CartContext'
import { MainRouter } from './routes/MainRouter'

/**
 * Componente Raiz da Aplicação.
 * Aqui definimos a hierarquia de Provedores de Estado (Contexts).
 * - BrowserRouter: Necessário para que os contexts usem hooks de navegação.
 * - AuthProvider: Gerencia login e dados do usuário.
 * - CartProvider: Gerencia itens e lógica do carrinho.
 * - MainRouter: Define todas as rotas da aplicação.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <MainRouter />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
