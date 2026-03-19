import type { ReactNode } from 'react'
import { Footer } from '@/shared/components/Footer'
import { Header } from '@/shared/components/Header'
import { Toaster } from '@/shared/components/ui/sonner'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <main className="layout-content flex-1 flex flex-col">{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
