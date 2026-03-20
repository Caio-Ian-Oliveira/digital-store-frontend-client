import type { Product } from '@/features/products'

/** Representa um item no carrinho de compras do usuário. */
export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}
