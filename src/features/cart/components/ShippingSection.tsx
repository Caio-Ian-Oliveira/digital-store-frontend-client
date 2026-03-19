import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { formatPrice } from '@/shared/utils/formatPrice'

interface ShippingSectionProps {
  cepInput: string
  setCepInput: (value: string) => void
  onCalculate: () => void
  shipping: number
  calculated: boolean
  idPrefix?: string
}

export const ShippingSection = ({
  cepInput,
  setCepInput,
  onCalculate,
  shipping,
  calculated,
  idPrefix = ''
}: ShippingSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <label
        htmlFor={`${idPrefix}cep-input`}
        className="text-sm font-medium text-dark-gray-2 mb-4 block cursor-pointer"
      >
        Calcular frete
      </label>
      <div className="flex gap-2">
        <Input
          id={`${idPrefix}cep-input`}
          value={cepInput}
          onChange={(e) => setCepInput(e.target.value)}
          placeholder="Insira seu CEP"
          className="bg-light-gray-3 border-0 h-11 lg:h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 w-full"
          onKeyDown={(e) => e.key === 'Enter' && onCalculate()}
        />
        <Button
          onClick={onCalculate}
          className="h-11 lg:h-12 px-6 bg-light-gray-3 border-0 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          OK
        </Button>
      </div>
      {calculated && (
        <p className="text-xs text-success mt-2">
          Frete: {shipping === 0 ? 'Grátis!' : formatPrice(shipping)}
        </p>
      )}
    </div>
  )
}
