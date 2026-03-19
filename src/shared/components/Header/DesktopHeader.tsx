import miniCart from '@/assets/images/mini-cart.svg'
import { CartModal } from '@/features/cart'
import { RouterLink } from '@/shared/components'
import Logo from '../Logo'
import { DesktopSearch } from './DesktopSearch'
import { UserProfileMenu } from './UserProfileMenu'

interface DesktopHeaderProps {
  isAuthPage: boolean
  isAuthenticated: boolean
  itemCount: number
  cartModalOpen: boolean
  onCartToggle: () => void
  onCartClose: () => void
}

export const DesktopHeader = ({
  isAuthPage,
  isAuthenticated,
  itemCount,
  cartModalOpen,
  onCartToggle,
  onCartClose
}: DesktopHeaderProps) => {
  return (
    <div className="hidden lg:block py-6 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-[100px] flex items-center gap-10">
        <Logo />
        {!isAuthPage && <DesktopSearch />}

        {isAuthPage ? (
          <div className="ml-auto">
            <RouterLink
              to="/login"
              className="w-[114px] h-10 bg-primary text-white text-sm font-bold rounded flex items-center justify-center grow-0"
            >
              Entrar
            </RouterLink>
          </div>
        ) : (
          <div className="flex items-center ml-auto gap-10">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onCartToggle()
                }}
                className="relative cursor-pointer bg-transparent border-none flex items-center justify-center w-8 h-8"
                aria-expanded={cartModalOpen}
              >
                <img src={miniCart} alt="Carrinho" className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-error text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <CartModal isOpen={cartModalOpen} onClose={onCartClose} />
            </div>

            {isAuthenticated ? (
              <UserProfileMenu />
            ) : (
              <div className="flex items-center gap-8">
                <RouterLink
                  to="/cadastro"
                  className="text-base text-dark-gray-2 underline"
                >
                  Cadastre-se
                </RouterLink>
                <RouterLink
                  to="/login"
                  className="w-[114px] h-10 bg-primary text-white text-sm font-bold rounded flex items-center justify-center"
                >
                  Entrar
                </RouterLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
