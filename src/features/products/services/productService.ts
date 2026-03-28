import { api } from '@/core'
import type { Product } from '../types/Product'

// Interface interna/exportada para tipar a resposta crua da API
export interface ApiProduct {
  id: number
  name: string
  slug: string
  price: number
  price_with_discount: number
  description: string | null
  enabled: boolean
  stock: number
  use_in_menu: boolean
  brand: string
  images: { id: number; path: string; enabled: boolean }[]
  options: {
    id: number
    title: string
    shape: 'square' | 'circle'
    radius: number
    type: 'text' | 'color'
    values: string[]
  }[]
  categories: { id: string; name: string; slug: string }[]
}

export interface SearchResponse<T = ApiProduct> {
  data: T[]
  total: number
  limit: number
  page: number
}

/**
 * Converte um produto da API para o formato que o Frontend já espera.
 * Toda a lógica de mapeamento de campos fica centralizada aqui.
 */
export function mapApiProduct(raw: ApiProduct): Product {
  const enabledImages = raw.images?.filter((img) => img.enabled) || []
  const mappedOptions = raw.options || []

  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    image: enabledImages[0]?.path || '/tenis-test.webp',
    price: raw.price,
    priceDiscount: raw.price_with_discount || undefined,
    description: raw.description || undefined,
    category: raw.categories?.[0]?.name || undefined,
    brand: raw.brand,
    images: enabledImages,
    options: mappedOptions,
    categories: raw.categories || []
  }
}

export interface GetProductsOptions {
  limit?: number
  page?: number
  match?: string
  brand?: string
  gender?: string
  category_ids?: string[]
  price_range?: {
    min: number
    max: number
  }
  options?: {
    [key: string]: string[]
  }
}

/**
 * Busca todos os produtos da API com suporte a filtros avançados.
 *
 * @param options - Opções de paginação, busca e filtros (marca, gênero, categorias, preço, etc).
 * @returns {Promise<SearchResponse<Product>>} Objeto contendo os produtos mapeados e metadados de paginação.
 */
export const getProducts = async (
  options?: GetProductsOptions
): Promise<SearchResponse<Product>> => {
  const params: Record<string, string | number | undefined> = {
    limit: options?.limit ?? 12,
    page: options?.page ?? 1,
    match: options?.match,
    brand: options?.brand,
    gender: options?.gender,
    category_ids: options?.category_ids?.join(',')
  }

  // Inclui faixa de preço no formato esperado pela API.
  if (options?.price_range) {
    params['price_range[min]'] = options.price_range.min
    params['price_range[max]'] = options.price_range.max
  }

  // Inclui filtros dinâmicos no formato `options[chave]=valor1,valor2`.
  if (options?.options) {
    Object.entries(options.options).forEach(([key, values]) => {
      params[`options[${key}]`] = values.join(',')
    })
  }

  const { data } = await api.get<SearchResponse<ApiProduct>>(
    '/product/search',
    { params }
  )

  return {
    ...data,
    data: data.data.map(mapApiProduct)
  }
}

/**
 * Busca um produto específico pelo seu ID ou Slug.
 *
 * @param id - ID ou Slug do produto.
 * @returns {Promise<Product | undefined>} O produto mapeado ou undefined em caso de erro.
 */
export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  try {
    const { data } = await api.get<ApiProduct>(`/product/${id}`)
    return mapApiProduct(data)
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error)
    return undefined
  }
}

/**
 * Busca produtos relacionados a um produto específico.
 * Atualmente simplificado para buscar os primeiros produtos da mesma categoria.
 *
 * @param productId - ID do produto de referência.
 * @param limit - Quantidade máxima de produtos relacionados (padrão 4).
 * @returns {Promise<Product[]>} Lista de produtos relacionados.
 */
export const getRelatedProducts = async (
  productId: string,
  limit = 4
): Promise<Product[]> => {
  try {
    const { data } = await getProducts({ limit: limit + 1 })
    return data.filter((p) => p.id !== productId).slice(0, limit)
  } catch (error) {
    console.error('Erro ao buscar produtos relacionados:', error)
    return []
  }
}
