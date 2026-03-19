import { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { useCart } from '@/features/cart'
import { DesktopHeader } from './DesktopHeader'
import { DesktopNav } from './DesktopNav'
import { MobileHeader } from './MobileHeader'

/**
 * Componente de Cabeçalho (Header) Global.
 * Gerencia o estado compartilhado e organiza os componentes mobile/desktop.
 */
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [cartModalOpen, setCartModalOpen] = useState(false)

  const location = useLocation()
  const { itemCount } = useCart()
  const { isAuthenticated } = useAuth()

  const isAuthPage =
    location.pathname === '/cadastro'
    || location.pathname === '/login'
    || location.pathname === '/register-form-page'

  const toggleCartModal = useCallback(() => {
    setCartModalOpen((prev) => !prev)
  }, [])

  const closeCartModal = useCallback(() => {
    setCartModalOpen(false)
  }, [])

  return (
    <header className="bg-white sticky top-0 z-40 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <MobileHeader
        isOpen={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        isSearchOpen={mobileSearchOpen}
        onSearchToggle={setMobileSearchOpen}
        isAuthPage={isAuthPage}
        isAuthenticated={isAuthenticated}
        itemCount={itemCount}
        cartModalOpen={cartModalOpen}
        onCartToggle={toggleCartModal}
        onCartClose={closeCartModal}
      />

      <DesktopHeader
        isAuthPage={isAuthPage}
        isAuthenticated={isAuthenticated}
        itemCount={itemCount}
        cartModalOpen={cartModalOpen}
        onCartToggle={toggleCartModal}
        onCartClose={closeCartModal}
      />

      <DesktopNav isAuthPage={isAuthPage} />
    </header>
  )
}
