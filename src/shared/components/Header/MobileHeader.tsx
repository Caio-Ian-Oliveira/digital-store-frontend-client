import { Menu, Search } from 'lucide-react'
import logoHeader from '@/assets/images/logo-header.svg'
import miniCart from '@/assets/images/mini-cart.svg'
import { CartModal } from '@/features/cart'
import {
  RouterLink,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components'
import { HeaderNavLink } from './HeaderNavLink'
import { MobileSearch } from './MobileSearch'
import { MobileUserProfileMenu } from './MobileUserProfileMenu'

interface MobileHeaderProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isSearchOpen: boolean
  onSearchToggle: (open: boolean) => void
  isAuthPage: boolean
  isAuthenticated: boolean
  itemCount: number
  cartModalOpen: boolean
  onCartToggle: () => void
  onCartClose: () => void
}

export const MobileHeader = ({
  isOpen,
  onOpenChange,
  isSearchOpen,
  onSearchToggle,
  isAuthPage,
  isAuthenticated,
  itemCount,
  cartModalOpen,
  onCartToggle,
  onCartClose
}: MobileHeaderProps) => {
  return (
    <div className="lg:hidden">
      <div className="h-14 flex items-center justify-between px-4">
        {isAuthPage ? (
          <>
            <RouterLink to="/" className="flex-shrink-0">
              <img
                src={logoHeader}
                alt="Digital Store"
                className="h-7 w-auto"
              />
            </RouterLink>
            <RouterLink
              to="/login"
              className="h-10 px-6 bg-primary text-white text-sm font-bold rounded flex items-center justify-center grow-0"
            >
              Entrar
            </RouterLink>
          </>
        ) : (
          <>
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="w-11 h-11 flex items-center justify-center text-dark-gray-2"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[80%] max-w-[320px] bg-white p-0 flex flex-col"
              >
                <SheetHeader className="p-5 border-b-0 space-y-0">
                  <SheetTitle className="flex items-center">
                    <img
                      src={logoHeader}
                      alt="Digital Store"
                      className="h-8 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex-1 px-5 py-4" aria-label="Menu principal">
                  <span className="block text-xs font-medium text-light-gray uppercase tracking-wider mb-4">
                    Páginas
                  </span>
                  <ul className="space-y-2 list-none p-0">
                    <li>
                      <HeaderNavLink
                        to="/"
                        variant="mobile"
                        onClick={() => onOpenChange(false)}
                      >
                        Home
                      </HeaderNavLink>
                    </li>
                    <li>
                      <HeaderNavLink
                        to="/products"
                        variant="mobile"
                        onClick={() => onOpenChange(false)}
                      >
                        Produtos
                      </HeaderNavLink>
                    </li>
                    <li>
                      <HeaderNavLink
                        to="/categorias"
                        variant="mobile"
                        onClick={() => onOpenChange(false)}
                      >
                        Categorias
                      </HeaderNavLink>
                    </li>
                    <li>
                      <HeaderNavLink
                        to="/meus-pedidos"
                        variant="mobile"
                        onClick={() => onOpenChange(false)}
                      >
                        Meus Pedidos
                      </HeaderNavLink>
                    </li>
                  </ul>
                </nav>

                <div className="mx-5 border-t border-light-gray-3" />

                <div className="p-5 space-y-4">
                  {isAuthenticated ? (
                    <MobileUserProfileMenu
                      onCloseMobileMenu={() => onOpenChange(false)}
                    />
                  ) : (
                    <>
                      <RouterLink
                        to="/login"
                        className="w-full h-12 bg-primary text-white text-base font-bold rounded-lg flex items-center justify-center"
                        onClick={() => onOpenChange(false)}
                      >
                        Entrar
                      </RouterLink>
                      <RouterLink
                        to="/cadastro"
                        className="block text-center text-base text-dark-gray-2 underline"
                        onClick={() => onOpenChange(false)}
                      >
                        Cadastre-se
                      </RouterLink>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <RouterLink to="/" className="flex-shrink-0">
              <img
                src={logoHeader}
                alt="Digital Store"
                className="h-7 w-auto"
              />
            </RouterLink>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onSearchToggle(!isSearchOpen)}
                className="w-11 h-11 flex items-center justify-center text-dark-gray-2"
                aria-label="Pesquisar"
              >
                <Search size={20} />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCartToggle()
                  }}
                  className="w-11 h-11 flex items-center justify-center relative cursor-pointer bg-transparent border-none"
                  aria-expanded={cartModalOpen}
                >
                  <img src={miniCart} alt="Carrinho" className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute top-1 right-1 bg-error text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
                <CartModal isOpen={cartModalOpen} onClose={onCartClose} />
              </div>
            </div>
          </>
        )}
      </div>

      {!isAuthPage && isSearchOpen && (
        <MobileSearch
          onSearchComplete={() => {
            onOpenChange(false)
            onSearchToggle(false)
          }}
        />
      )}
    </div>
  )
}
