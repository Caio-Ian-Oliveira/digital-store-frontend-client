import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

/* ─── Sidebar Links ─── */

const sidebarLinks = [
  { to: '/perfil', label: 'Meu Perfil' },
  { to: '/meus-pedidos', label: 'Meus Pedidos' },
  { to: '/minhas-informacoes', label: 'Minhas Informações' },
  { to: '/metodos-pagamento', label: 'Métodos de Pagamento' }
]

/* ─── Profile Layout ─── */

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 xl:px-[100px] py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-8">
        {/* Sidebar Card - Desktop */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <nav aria-label="Menu do perfil">
              <ul className="space-y-0">
                {sidebarLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block py-4 text-sm border-b border-light-gray-3 last:border-b-0 transition-colors ${
                          isActive
                            ? 'text-primary font-bold'
                            : 'text-dark-gray-2 hover:text-primary'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Sidebar - Mobile (horizontal tabs) */}
        <div className="lg:hidden overflow-x-auto -mx-4 px-4">
          <nav
            className="flex gap-6 border-b border-light-gray-3 min-w-max"
            aria-label="Menu do perfil"
          >
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `pb-3 text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-dark-gray-2'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Content Card */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
