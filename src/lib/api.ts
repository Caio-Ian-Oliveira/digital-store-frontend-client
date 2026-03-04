import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
  withCredentials: true // Permite o tráfego de Cookies HTTP-Only gerados pelo Backend
})

// Interceptor que detecta token JWT expirado e faz logout automático,
// evitando "sessões fantasma" onde o front acha que está logado mas o cookie expirou.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@DigitalStore:user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
