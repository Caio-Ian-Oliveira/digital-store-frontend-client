import { type RefObject, useEffect } from 'react'

/**
 * Hook que detecta cliques fora de um elemento referenciado e chama um handler.
 * Ütil para fechar modais, dropdowns ou menus ao clicar fora deles.
 *
 * @param ref - Ref do elemento que define a "borda" do clique-fora.
 * @param handler - Função chamada ao detectar um clique externo.
 * @param enabled - Se `false`, o listener não é registrado (padrão `true`).
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('touchend', handleClickOutside)
    }, 10)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }
  }, [ref, handler, enabled])
}
