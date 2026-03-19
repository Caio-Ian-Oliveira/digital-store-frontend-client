import type { Product } from '@/features/products'

interface CheckoutProductItemProps {
  product: Product
  quantity: number
}

export const CheckoutProductItem = ({
  product,
  quantity
}: CheckoutProductItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-dark-gray-2 leading-snug">
          {product.name}
        </p>
        {quantity > 1 && (
          <p className="text-xs text-light-gray mt-1">Qtd: {quantity}</p>
        )}
      </div>
    </div>
  )
}
