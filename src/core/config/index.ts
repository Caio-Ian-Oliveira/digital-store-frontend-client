/**
 * Configurações globais da aplicação.
 * Centraliza URLs, chaves de armazenamento e outras constantes.
 */

export const CONFIG = {
  API_URL: 'http://localhost:3000/v1',
  STORAGE_KEYS: {
    USER: '@DigitalStore:user'
  },
  COUPONS: {
    DESCONTO10: 10,
    PROMO20: 20,
    OFF30: 30
  } as Record<string, number>
}
