import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

interface CheckoutFormData {
  fullName: string
  cpf: string
  email: string
  phone: string
  address: string
  neighborhood: string
  city: string
  cep: string
  complement?: string
  paymentMethod: 'credit-card' | 'boleto'
}

interface DeliveryAddressSectionProps {
  register: UseFormRegister<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
}

export const DeliveryAddressSection = ({
  register,
  errors
}: DeliveryAddressSectionProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="address" className="text-xs font-bold text-dark-gray-2">
          Endereço <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Input
          id="address"
          placeholder="Insira seu endereço"
          {...register('address')}
          className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.address ? 'ring-1 ring-error' : ''}`}
        />
        {errors.address && (
          <p className="text-xs text-error mt-1">
            {errors.address.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="neighborhood"
          className="text-xs font-bold text-dark-gray-2"
        >
          Bairro <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Input
          id="neighborhood"
          placeholder="Insira seu bairro"
          {...register('neighborhood')}
          className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.neighborhood ? 'ring-1 ring-error' : ''}`}
        />
        {errors.neighborhood && (
          <p className="text-xs text-error mt-1">
            {errors.neighborhood.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-xs font-bold text-dark-gray-2">
          Cidade <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Input
          id="city"
          placeholder="Insira sua cidade"
          {...register('city')}
          className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.city ? 'ring-1 ring-error' : ''}`}
        />
        {errors.city && (
          <p className="text-xs text-error mt-1">
            {errors.city.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cep" className="text-xs font-bold text-dark-gray-2">
          CEP <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Input
          id="cep"
          placeholder="Insira seu CEP"
          {...register('cep')}
          className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.cep ? 'ring-1 ring-error' : ''}`}
        />
        {errors.cep && (
          <p className="text-xs text-error mt-1">
            {errors.cep.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="complement"
          className="text-xs font-bold text-dark-gray-2"
        >
          Complemento
        </Label>
        <Input
          id="complement"
          placeholder="Insira complemento"
          {...register('complement')}
          className="bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary"
        />
      </div>
    </div>
  )
}
