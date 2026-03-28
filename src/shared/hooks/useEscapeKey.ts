import { useEffect } from 'react'

/**
 * Hook que detecta o pressionamento da tecla `Escape` e chama um handler.
 * Ütil para fechar modais ou menus com o teclado sem acessibilidade manual.
 *
 * @param handler - Função chamada quando a tecla Escape é pressionada.
 * @param enabled - Se `false`, o listener não é registrado (padrão `true`).
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
