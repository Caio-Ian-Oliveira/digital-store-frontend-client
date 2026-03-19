import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { useCPFMask } from '@/shared/hooks'
import { isValidCPF } from '@/shared/utils'
import { Input } from './input'

interface CPFInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string, isValid: boolean) => void
  onValidationChange?: (isValid: boolean) => void
  showValidation?: boolean
}

export const CPFInput = forwardRef<HTMLInputElement, CPFInputProps>(
  (
    {
      value = '',
      onChange,
      onValidationChange,
      showValidation = true,
      className = '',
      onBlur,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [hasBlurred, setHasBlurred] = useState(false)
    const { applyMask, getCleanValue } = useCPFMask()

    // Sincroniza valor de entrada com valor formatado
    useEffect(() => {
      if (value !== undefined) {
        const cleanValue = getCleanValue(value)
        const maskedValue =
          cleanValue.length > 0
            ? displayValue.replace(/\D/g, '') === cleanValue
              ? displayValue
              : (() => {
                  const tempInput = document.createElement('input')
                  tempInput.value = cleanValue
                  applyMask({
                    target: tempInput
                  } as ChangeEvent<HTMLInputElement>)
                  return tempInput.value
                })()
            : ''

        setDisplayValue(maskedValue)
      }
    }, [value, getCleanValue, applyMask, displayValue])

    // Verifica validade quando display value muda
    useEffect(() => {
      const cleanValue = getCleanValue(displayValue)
      const valid = cleanValue.length === 11 && isValidCPF(cleanValue)
      setIsValid(valid)
      onValidationChange?.(valid)
    }, [displayValue, getCleanValue, onValidationChange])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      applyMask(e)
      const maskedValue = e.target.value
      const cleanValue = getCleanValue(maskedValue)

      setDisplayValue(maskedValue)

      if (onChange) {
        const valid = cleanValue.length === 11 && isValidCPF(cleanValue)
        onChange(cleanValue, valid)
      }
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setHasBlurred(true)
      onBlur?.(e)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permite apenas números e teclas de controle
      const isNumber = /[0-9]/.test(e.key)
      const isControlKey = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown'
      ].includes(e.key)

      if (!isNumber && !isControlKey) {
        e.preventDefault()
      }
    }

    const showError =
      showValidation && hasBlurred && displayValue.length > 0 && !isValid

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        className={`${className} ${showError ? 'ring-2 ring-[#C92071]/50 bg-[#C92071]/5' : ''}`}
        placeholder={props.placeholder || '000.000.000-00'}
        inputMode="numeric"
        autoComplete="off"
      />
    )
  }
)

CPFInput.displayName = 'CPFInput'
