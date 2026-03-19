/**
 * Utilitários para validação e formatação de CPF
 */

/**
 * Remove todos os caracteres não numéricos de uma string
 */
export const removeNonNumbers = (value: string | undefined | null): string => {
  if (!value) return ''
  return value.replace(/\D/g, '')
}

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export const formatCPF = (value: string): string => {
  const numbers = removeNonNumbers(value)

  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  if (numbers.length <= 9)
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`

  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

/**
 * Valida se um CPF é válido (algoritmo oficial)
 */
export const isValidCPF = (cpf: string): boolean => {
  const numbers = removeNonNumbers(cpf)

  // CPF deve ter 11 dígitos
  if (numbers.length !== 11) return false

  // Verifica se todos os dígitos são iguais (CPF inválido comum)
  if (numbers.split('').every((digit) => digit === numbers[0])) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i)
  }
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder

  if (parseInt(numbers[9]) !== firstDigit) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i)
  }
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder

  return parseInt(numbers[10]) === secondDigit
}

/**
 * Aplica máscara de telefone
 * Formato: (00) 00000-0000 para celular ou (00) 0000-0000 para fixo
 */
export const formatPhone = (value: string): string => {
  const numbers = removeNonNumbers(value)

  if (numbers.length <= 2) return numbers
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 10) {
    // Telefone fixo: (00) 0000-0000
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
  }

  // Celular: (00) 00000-0000
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

/**
 * Valida se um telefone tem formato válido
 */
export const isValidPhone = (phone: string): boolean => {
  const numbers = removeNonNumbers(phone)

  // Celular: 11 dígitos (DDD + 9 + 8 dígitos)
  if (numbers.length === 11 && numbers[2] === '9') {
    return true
  }

  // Telefone fixo: 10 dígitos (DDD + 8 dígitos)
  if (numbers.length === 10 && numbers[2] !== '9') {
    return true
  }

  return false
}

/**
 * Aplica máscara de CEP (00000-000)
 */
export const formatCEP = (value: string): string => {
  const numbers = removeNonNumbers(value)

  if (numbers.length <= 5) return numbers

  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
}

/**
 * Valida se um CEP tem formato válido
 */
export const isValidCEP = (cep: string): boolean => {
  const numbers = removeNonNumbers(cep)
  return numbers.length === 8
}
