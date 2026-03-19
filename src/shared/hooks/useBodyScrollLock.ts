import { useEffect } from 'react'

/**
 * Hook para travar o scroll do body.
 */
export function useBodyScrollLock(isLocked: boolean, isMobileOnly = true) {
  useEffect(() => {
    const shouldLock = isLocked && (!isMobileOnly || window.innerWidth < 1024)

    if (shouldLock) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isLocked, isMobileOnly])
}
