import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { CPFInput, PhoneInput } from '@/shared/components'
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

interface PersonalInfoSectionProps {
  register: UseFormRegister<CheckoutFormData>
  control: Control<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
}

export const PersonalInfoSection = ({
  register,
  control,
  errors
}: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="fullName"
          className="text-xs font-bold text-dark-gray-2"
        >
          Nome Completo <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="Insira seu nome"
          {...register('fullName')}
          className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.fullName ? 'ring-1 ring-error' : ''}`}
        />
        {errors.fullName && (
          <p className="text-xs text-error mt-1">
            {errors.fullName.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf" className="text-xs font-bold text-dark-gray-2">
          CPF <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <CPFInput
              id="cpf"
              placeholder="Insira seu CPF"
              className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.cpf ? 'ring-1 ring-error' : ''}`}
              value={field.value}
              onChange={(cleanValue) => field.onChange(cleanValue)}
              onBlur={field.onBlur}
              showValidation={false}
            />
          )}
        />
        {errors.cpf && (
          <p className="text-xs text-error mt-1">
            {errors.cpf.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-bold text-dark-gray-2">
          E-mail <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Insira seu email"
          {...register('email')}
          className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.email ? 'ring-1 ring-error' : ''}`}
        />
        {errors.email && (
          <p className="text-xs text-error mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-xs font-bold text-dark-gray-2">
          Celular <span className="text-[#ED1A5A]">*</span>
        </Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              placeholder="Insira seu celular"
              className={`bg-light-gray-3 border-0 h-12 rounded-lg text-dark-gray-2 placeholder:text-light-gray-2 focus-visible:ring-primary ${errors.phone ? 'ring-1 ring-error' : ''}`}
              value={field.value}
              onChange={(cleanValue) => field.onChange(cleanValue)}
              onBlur={field.onBlur}
              showValidation={false}
            />
          )}
        />
        {errors.phone && (
          <p className="text-xs text-error mt-1">
            {errors.phone.message as string}
          </p>
        )}
      </div>
    </div>
  )
}
