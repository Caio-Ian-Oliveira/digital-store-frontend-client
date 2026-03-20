import { useMutation } from '@tanstack/react-query'
import { api } from '@/core'

/**
 * Hook de mutação para logout do usuário.
 * Invalida a sessão no servidor via endpoint de logout.
 */
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/user/logout')
      return response.data
    }
  })
}
