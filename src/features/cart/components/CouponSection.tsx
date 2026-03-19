import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

interface CouponSectionProps {
  couponInput: string
  setCouponInput: (value: string) => void
  onApply: () => void
  couponCode: string | null
  onRemove: () => void
  error: boolean
  idPrefix?: string
}

export const CouponSection = ({
  couponInput,
  setCouponInput,
  onApply,
  couponCode,
  onRemove,
  error,
  idPrefix = ''
}: CouponSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <label
        htmlFor={`${idPrefix}coupon-input`}
        className="text-sm font-medium text-dark-gray-2 mb-4 block cursor-pointer"
      >
        Cupom de desconto
      </label>
      <div className="flex gap-2">
        <Input
          id={`${idPrefix}coupon-input`}
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Insira seu código"
          className="bg-light-gray-3 border-0 h-11 lg:h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 w-full"
          onKeyDown={(e) => e.key === 'Enter' && onApply()}
        />
        <Button
          onClick={onApply}
          className="h-11 lg:h-12 px-6 bg-light-gray-3 border-0 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          OK
        </Button>
      </div>
      {error && <p className="text-xs text-error mt-2">Cupom inválido</p>}
      {couponCode && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-success font-medium">
            Cupom {couponCode} aplicado!
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-error underline cursor-pointer"
          >
            Remover
          </button>
        </div>
      )}
    </div>
  )
}
