import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { MainRouter } from './routers/MainRouter'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainRouter />
      </CartProvider>
    </AuthProvider>
  )
}
