import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Mescla classes CSS de forma inteligente usando clsx + tailwind-merge.
 * Resolve conflitos de classes utilitárias do Tailwind automaticamente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
