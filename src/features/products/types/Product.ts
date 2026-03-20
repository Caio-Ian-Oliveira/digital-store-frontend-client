/** Representa uma imagem de produto vinda da API. */
export interface ProductImage {
  id: number
  path: string
  enabled: boolean
}

/** Representa uma opção de personalização do produto (ex: cor, tamanho). */
export interface ProductOption {
  id: number
  title: string
  shape: 'square' | 'circle'
  radius: number
  type: 'text' | 'color'
  values: string[]
}

/** Representa uma categoria associada ao produto. */
export interface ProductCategory {
  id: string
  name: string
  slug: string
}

/** Entidade principal de Produto utilizada no Front-end. */
export interface Product {
  id: string
  name: string
  slug?: string
  image: string
  price: number
  priceDiscount?: number
  description?: string
  category?: string
  brand?: string
  gender?: string
  reference?: string
  stars?: number
  rating?: number
  images?: ProductImage[]
  options?: ProductOption[]
  categories?: ProductCategory[]
}
