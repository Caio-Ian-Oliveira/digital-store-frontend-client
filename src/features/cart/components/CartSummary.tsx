import { Button } from '@/shared/components/ui/button'
import { formatPrice } from '@/shared/utils/formatPrice'

interface CartSummaryProps {
  subtotal: number
  shipping: number
  discount: number
  total: number
  onContinue: () => void
  disabled?: boolean
  variant?: 'desktop' | 'mobile'
}

export const CartSummary = ({
  subtotal,
  shipping,
  discount,
  total,
  onContinue,
  disabled,
  variant = 'desktop'
}: CartSummaryProps) => {
  const installmentValue =
    total > 0 ? (total / 10).toFixed(2).replace('.', ',') : '0,00'

  const Content = () => (
    <>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span
            className={
              variant === 'mobile' ? 'text-dark-gray-3' : 'text-light-gray-2'
            }
          >
            Subtotal:
          </span>
          <span className="text-dark-gray-2 font-medium">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span
            className={
              variant === 'mobile' ? 'text-dark-gray-3' : 'text-light-gray-2'
            }
          >
            Frete:
          </span>
          <span className="text-dark-gray-2 font-medium">
            {formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span
            className={
              variant === 'mobile' ? 'text-dark-gray-3' : 'text-light-gray-2'
            }
          >
            Desconto:
          </span>
          <span className="text-dark-gray-2 font-medium">
            {formatPrice(discount)}
          </span>
        </div>
      </div>

      <div
        className={`${variant === 'desktop' ? 'border-t border-light-gray-3 pt-4' : ''} mb-6`}
      >
        <div className="flex items-center justify-between">
          <span
            className={
              variant === 'mobile'
                ? 'text-lg font-bold text-dark-gray-2'
                : 'text-base font-bold text-dark-gray-2'
            }
          >
            Total
          </span>
          <div className="text-right">
            <span className="text-xl font-bold text-primary">
              {formatPrice(total)}
            </span>
            <p className="text-xs text-light-gray">
              ou 10x de R$ {installmentValue} sem juros
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onContinue}
        disabled={disabled}
        className="w-full h-12 bg-warning hover:bg-warning/90 text-white font-bold text-base rounded-lg transition-colors disabled:opacity-50"
      >
        Continuar
      </Button>
    </>
  )

  if (variant === 'mobile') {
    return (
      <div className="bg-white rounded-lg px-5 pt-5 pb-6">
        <h2 className="text-base font-bold text-dark-gray-2 uppercase">
          RESUMO
        </h2>
        <div className="h-px bg-light-gray-3 mt-3 mb-5" />
        <Content />
      </div>
    )
  }

  return <Content />
}
