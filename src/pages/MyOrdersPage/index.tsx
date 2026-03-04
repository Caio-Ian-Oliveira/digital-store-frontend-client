import ProfileLayout from '@/components/ProfileLayout'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

/* ─── Tipos ─── */

interface OrderItem {
  product_id: number
  product_name: string
  image_url: string
  quantity: number
  price_at_purchase: number
}

interface Order {
  id: string
  status: string
  created_at: string
  total: number
  items: OrderItem[]
}

/* ─── Helpers ─── */

const statusMap: Record<string, { label: string; className: string }> = {
  pending: {
    label: 'Produto em trânsito',
    className: 'text-primary font-bold'
  },
  in_transit: {
    label: 'Produto em trânsito',
    className: 'text-primary font-bold'
  },
  completed: {
    label: 'Finalizado',
    className: 'text-dark-gray-2 font-medium'
  },
  cancelled: {
    label: 'Cancelado',
    className: 'text-primary font-bold'
  }
}

function getStatusInfo(status: string) {
  return (
    statusMap[status] ?? {
      label: status,
      className: 'text-dark-gray-2 font-medium'
    }
  )
}

function formatOrderId(id: string) {
  const digits = id.replace(/\D/g, '')
  return digits.slice(0, 10) || id.slice(0, 10)
}

/* ─── Order Row ─── */

function OrderRow({ order }: { order: Order }) {
  const firstItem = order.items[0]
  const statusInfo = getStatusInfo(order.status)

  return (
    <div className="flex items-center gap-4 py-5 border-b border-light-gray-3 last:border-b-0">
      {/* Thumbnail */}
      <div className="w-16 h-16 shrink-0 rounded bg-[#E2E3FF] flex items-center justify-center overflow-hidden p-1">
        {firstItem ? (
          <img
            src={firstItem.image_url}
            alt={firstItem.product_name}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        ) : (
          <div className="w-full h-full bg-light-gray-3 rounded" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-light-gray mb-0.5">
          Pedido nº {formatOrderId(order.id)}
        </p>
        <p className="text-sm font-bold text-dark-gray-2 leading-snug truncate">
          {firstItem?.product_name ?? 'Pedido'}
          {order.items.length > 1 && (
            <span className="text-light-gray font-normal">
              {' '}e mais {order.items.length - 1}{' '}
              {order.items.length - 1 === 1 ? 'item' : 'itens'}
            </span>
          )}
        </p>
      </div>

      {/* Status Badge */}
      <span className={`shrink-0 text-sm whitespace-nowrap ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    </div>
  )
}

/* ─── Page ─── */

export default function MyOrdersPage() {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return

      try {
        setIsLoading(true)
        const { data } = await api.get<Order[]>('/orders')
        setOrders(Array.isArray(data) ? data : [])
      } catch (err: any) {
        console.error('Erro ao carregar pedidos:', err)
        setError('Não foi possível carregar seus pedidos.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated])

  return (
    <ProfileLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-4 border-b border-light-gray-3">
        <h1 className="text-base font-bold text-dark-gray-2">
          Meus Pedidos
        </h1>
        <span className="text-xs font-bold text-dark-gray-2 uppercase tracking-wide">
          Status
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 bg-light-gray-3 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-light-gray-3 rounded w-24" />
                <div className="h-4 bg-light-gray-3 rounded w-48" />
              </div>
              <div className="h-4 bg-light-gray-3 rounded w-28" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="py-12 text-center">
          <p className="text-error font-medium mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm text-primary underline hover:text-tertiary transition-colors cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && orders.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-light-gray text-sm mb-4">
            Você ainda não possui nenhum pedido.
          </p>
          <NavLink
            to="/products"
            className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white text-sm font-semibold rounded-full hover:bg-tertiary transition-colors"
          >
            Explorar Produtos
          </NavLink>
        </div>
      )}

      {/* Order List */}
      {!isLoading && !error && orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </ProfileLayout>
  )
}
