import { useMutation } from '@tanstack/react-query'
import { api } from '@/core'
import type { LoginFormData } from '../utils/loginSchema'

/**
 * Hook de mutação para login do usuário.
 * Envia credenciais (email/senha) para o endpoint de autenticação da API.
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await api.post('/user/login', {
        email: credentials.email,
        password: credentials.password
      })
      return response.data
    }
  })
}
