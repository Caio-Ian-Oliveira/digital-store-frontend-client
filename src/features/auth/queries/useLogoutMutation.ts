import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/user/logout')
      return response.data
    }
  })
}
