import { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface HeaderNavLinkProps {
  to: string
  children: ReactNode
  onClick?: () => void
  variant?: 'desktop' | 'mobile'
}

/**
 * Componente de Link de Navegação para o Header com estilização unificada.
 */
export const HeaderNavLink = ({
  to,
  children,
  onClick,
  variant = 'desktop'
}: HeaderNavLinkProps) => {
  const desktopClassName = ({ isActive }: { isActive: boolean }) =>
    `relative inline-block py-3 text-base font-normal text-dark-gray-2 no-underline hover:text-primary transition-colors ${
      isActive
        ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary'
        : ''
    }`

  const mobileClassName = ({ isActive }: { isActive: boolean }) =>
    `block py-3 text-base min-h-12 flex items-center transition-opacity active:opacity-60 ${
      isActive
        ? 'text-primary underline underline-offset-4 decoration-primary decoration-2 font-bold'
        : 'text-dark-gray-2 font-normal'
    }`

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={variant === 'desktop' ? desktopClassName : mobileClassName}
    >
      {children}
    </NavLink>
  )
}
