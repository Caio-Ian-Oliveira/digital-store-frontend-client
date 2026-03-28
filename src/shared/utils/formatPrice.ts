/**
 * Formata um valor numérico para o padrão de moeda brasileiro (BRL).
 *
 * @param value - Valor numérico a ser formatado (ex: `129.90`).
 * @returns String formatada em Real Brasileiro (ex: `"R$ 129,90"`).
 */
export const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
