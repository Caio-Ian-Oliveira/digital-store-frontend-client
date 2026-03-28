import type { ChangeEvent } from 'react'
import { formatCEP, formatCPF, formatPhone, removeNonNumbers } from '../utils'

/**
 * Hook para aplicar máscara de CPF (000.000.000-00) em inputs.
 *
 * @returns {Object} Funções applyMask e getCleanValue.
 */
export const useCPFMask = () => {
  const applyMask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target
    const unmaskedValue = removeNonNumbers(value)

    // Limita a 11 dígitos
    if (unmaskedValue.length > 11) return

    const maskedValue = formatCPF(unmaskedValue)
    e.target.value = maskedValue

    // Ajusta posição do cursor
    const newCursorPosition = calculateCursorPosition(
      value,
      maskedValue,
      selectionStart || 0
    )

    requestAnimationFrame(() => {
      e.target.setSelectionRange(newCursorPosition, newCursorPosition)
    })
  }

  const getCleanValue = (maskedValue: string) => removeNonNumbers(maskedValue)

  return { applyMask, getCleanValue }
}

/**
 * Hook para aplicar máscara de telefone ((00) 00000-0000) em inputs.
 *
 * @returns {Object} Funções applyMask e getCleanValue.
 */
export const usePhoneMask = () => {
  const applyMask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target
    const unmaskedValue = removeNonNumbers(value)

    // Limita a 11 dígitos
    if (unmaskedValue.length > 11) return

    const maskedValue = formatPhone(unmaskedValue)
    e.target.value = maskedValue

    // Ajusta posição do cursor
    const newCursorPosition = calculateCursorPosition(
      value,
      maskedValue,
      selectionStart || 0
    )

    requestAnimationFrame(() => {
      e.target.setSelectionRange(newCursorPosition, newCursorPosition)
    })
  }

  const getCleanValue = (maskedValue: string) => removeNonNumbers(maskedValue)

  return { applyMask, getCleanValue }
}

/**
 * Hook para aplicar máscara de CEP (00000-000) em inputs.
 *
 * @returns {Object} Funções applyMask e getCleanValue.
 */
export const useCEPMask = () => {
  const applyMask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target
    const unmaskedValue = removeNonNumbers(value)

    // Limita a 8 dígitos
    if (unmaskedValue.length > 8) return

    const maskedValue = formatCEP(unmaskedValue)
    e.target.value = maskedValue

    // Ajusta posição do cursor
    const newCursorPosition = calculateCursorPosition(
      value,
      maskedValue,
      selectionStart || 0
    )

    requestAnimationFrame(() => {
      e.target.setSelectionRange(newCursorPosition, newCursorPosition)
    })
  }

  const getCleanValue = (maskedValue: string) => removeNonNumbers(maskedValue)

  return { applyMask, getCleanValue }
}

/**
 * Calcula a nova posição do cursor após aplicar a máscara, evitando saltos indesejados.
 *
 * @param oldValue Valor antes da mudança.
 * @param newValue Valor após a máscara.
 * @param oldCursorPosition Posição original do cursor.
 * @returns Nova posição calculada.
 */
const calculateCursorPosition = (
  oldValue: string,
  newValue: string,
  oldCursorPosition: number
): number => {
  // Em remoções, mantém o cursor dentro do novo limite de caracteres.
  if (newValue.length < oldValue.length) {
    return Math.min(oldCursorPosition, newValue.length)
  }

  // Em inserções, desloca o cursor considerando os caracteres de máscara inseridos.
  let newCursorPosition = oldCursorPosition
  const lengthDifference = newValue.length - oldValue.length

  // Avança o cursor apenas quando houve expansão do valor formatado.
  if (lengthDifference > 0) {
    newCursorPosition += lengthDifference
  }

  return Math.min(newCursorPosition, newValue.length)
}
