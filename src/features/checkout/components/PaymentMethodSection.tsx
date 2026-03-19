import { Label } from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

interface PaymentMethodSectionProps {
  paymentMethod: 'credit-card' | 'boleto'
  onMethodChange: (val: 'credit-card' | 'boleto') => void
}

export const PaymentMethodSection = ({
  paymentMethod,
  onMethodChange
}: PaymentMethodSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-bold text-dark-gray-2">
          Forma de Pagamento
        </Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(val) =>
            onMethodChange(val as 'credit-card' | 'boleto')
          }
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="credit-card"
              id="credit-card"
              className="text-[#ED1A5A] border-light-gray-2"
            />
            <Label
              htmlFor="credit-card"
              className="text-sm text-dark-gray-2 font-normal cursor-pointer"
            >
              Cartão de Crédito
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="boleto"
              id="boleto"
              className="text-[#ED1A5A] border-light-gray-2"
            />
            <Label
              htmlFor="boleto"
              className="text-sm text-dark-gray-2 font-normal cursor-pointer"
            >
              Boleto Bancário
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === 'credit-card' && (
        <div className="space-y-5 pt-2">
          <p className="text-sm text-[#474747] bg-[#FEF6E8] p-4 rounded-lg text-center font-medium">
            🎉 Ambiente de Demonstração! <br /> Pagamentos via Cartão de Crédito
            são aprovados automaticamente.
          </p>
        </div>
      )}

      {paymentMethod === 'boleto' && (
        <div className="space-y-5 pt-2">
          <p className="text-sm text-light-gray-2 bg-light-gray-3 p-4 rounded-lg text-center font-medium">
            🏦 Ambiente de Demonstração! <br /> O boleto será gerado
            automaticamente após a confirmação do pedido.
          </p>
        </div>
      )}
    </div>
  )
}
