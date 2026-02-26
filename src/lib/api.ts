import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
  withCredentials: true // Permite o tráfego de Cookies HTTP-Only gerados pelo Backend
})
