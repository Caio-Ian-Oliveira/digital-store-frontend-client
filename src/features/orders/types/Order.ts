export interface OrderItem {
  id?: string
  product_id: string | number
  product_name: string
  image_url: string
  quantity: number
  price_at_purchase: number
}

export interface PersonalInfo {
  full_name: string
  cpf: string
  email: string
  phone: string
}

export interface DeliveryAddress {
  address: string
  neighborhood: string
  city: string
  cep: string
  complement?: string
}

export interface PaymentInfo {
  method: string
  installments?: number
}

export interface OrderSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
}

export interface Order {
  id: string
  status: string
  created_at: string
  total?: number
  items: OrderItem[]
  personal_info?: PersonalInfo
  delivery_address?: DeliveryAddress
  payment_info?: PaymentInfo
  summary?: OrderSummary
}
