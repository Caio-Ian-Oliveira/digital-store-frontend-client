import { useNavigate } from 'react-router-dom'
import { type Product, ProductCard } from '@/features/products'
import { Section } from '@/shared/components/Section'
import { Button } from '@/shared/components/ui/button'

interface EmptyCartProps {
  relatedProducts: Product[]
}

export const EmptyCart = ({ relatedProducts }: EmptyCartProps) => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <h1 className="text-2xl font-bold text-dark-gray-2 mb-4">
          Seu carrinho está vazio
        </h1>
        <p className="text-light-gray mb-8">
          Adicione produtos ao carrinho para continuar comprando.
        </p>
        <Button
          onClick={() => navigate('/products')}
          className="bg-primary hover:bg-tertiary text-white font-bold px-8 h-12 rounded-lg"
        >
          Ver Produtos
        </Button>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <Section
            title="Produtos Relacionados"
            link={{ text: 'Ver todos', href: '/products' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  priceDiscount={product.priceDiscount}
                  category={product.category}
                />
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}
