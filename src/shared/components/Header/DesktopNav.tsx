import { HeaderNavLink } from './HeaderNavLink'

interface DesktopNavProps {
  isAuthPage: boolean
}

export const DesktopNav = ({ isAuthPage }: DesktopNavProps) => {
  if (isAuthPage) return null

  return (
    <nav className="hidden lg:block bg-white border-t border-light-gray-3">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-[100px] flex gap-8">
        <HeaderNavLink to="/">Home</HeaderNavLink>
        <HeaderNavLink to="/products">Produtos</HeaderNavLink>
        <HeaderNavLink to="/categorias">Categorias</HeaderNavLink>
        <HeaderNavLink to="/meus-pedidos">Meus Pedidos</HeaderNavLink>
      </div>
    </nav>
  )
}
