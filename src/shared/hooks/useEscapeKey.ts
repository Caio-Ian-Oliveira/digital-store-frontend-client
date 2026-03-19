import { useEffect } from 'react'

/**
 * Hook para detectar tecla Escape.
 */
export function useEscapeKey(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handler, enabled])
}
