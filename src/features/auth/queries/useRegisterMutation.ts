import { useMutation } from '@tanstack/react-query'
import type { RegisterUserPayload } from '../api/userService'
import { registerUser } from '../api/userService'

/**
 * Hook de mutação para cadastro de novo usuário.
 * Envia os dados de registro para a API e retorna o resultado.
 */
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterUserPayload) => registerUser(payload)
  })
}
