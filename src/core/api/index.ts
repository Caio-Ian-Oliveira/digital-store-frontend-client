import axios from 'axios'
import { CONFIG } from '../config'

/**
 * Instância global do Axios configurada para a Digital Store API.
 */
export const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true
})

/**
 * Interceptador para tratar erros globais (ex: 401 Unauthorized).
 * Se o backend retornar 401, a sessão expirou ou é inválida, limpamos o storage e redirecionamos se necessário.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o backend retornar 401, a sessão expirou ou é inválida
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER)
      } catch (e) {
        console.warn('Erro ao limpar storage no 401', e)
      }

      const currentPath = window.location.pathname
      const publicPaths = ['/login', '/cadastro', '/register-form-page', '/']

      // Redireciona para o login apenas se estiver em uma rota privada
      if (!publicPaths.includes(currentPath)) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
