import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CartItem,
  CartSummary,
  CouponSection,
  EmptyCart,
  ShippingSection,
  useCart
} from '@/features/cart'
import {
  getRelatedProducts,
  type Product,
  ProductCard
} from '@/features/products'
import { Section } from '@/shared/components'

/**
 * Página do Carrinho de Compras.
 * Exibe os itens adicionados, permite alterar quantidades, remover produtos,
 * aplicar cupons de desconto e calcular frete (simulado).
 */
export default function CartPage() {
  const navigate = useNavigate()
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    applyCoupon,
    couponCode,
    removeCoupon,
    setShipping
  } = useCart()

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState(false)
  const [cepInput, setCepInput] = useState('')
  const [cepCalculated, setCepCalculated] = useState(false)

  useEffect(() => {
    const fetchRelated = async () => {
      // Busca recomendações excluindo itens que já estão no carrinho
      const cartIds = items.map((item) => item.product.id)
      const data = await getRelatedProducts('', 8)
      setRelatedProducts(
        data.filter((p) => !cartIds.includes(p.id)).slice(0, 4)
      )
    }
    fetchRelated()
  }, [items])

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return
    const success = applyCoupon(couponInput)
    if (!success) {
      setCouponError(true)
      setTimeout(() => setCouponError(false), 3000)
    } else {
      setCouponError(false)
      setCouponInput('')
    }
  }

  const handleCalculateShipping = () => {
    if (!cepInput.trim()) return
    setShipping(0)
    setCepCalculated(true)
  }

  const handleContinue = () => {
    if (items.length === 0) return
    navigate('/checkout')
  }

  if (items.length === 0) {
    return <EmptyCart relatedProducts={relatedProducts} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Coluna Esquerda: Itens do Carrinho */}
        <div className="w-full lg:w-[65%]">
          {/* Cabeçalho da tabela (Desktop) */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_140px_120px_120px] gap-4 mb-4 pb-3 border-b border-light-gray-3">
            <span className="text-sm font-medium text-dark-gray-3 uppercase">
              MEU CARRINHO
            </span>
            <span className="text-sm font-medium text-dark-gray-3 uppercase text-center">
              QUANTIDADE
            </span>
            <span className="text-sm font-medium text-dark-gray-3 uppercase text-right">
              UNITÁRIO
            </span>
            <span className="text-sm font-medium text-dark-gray-3 uppercase text-right">
              TOTAL
            </span>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="lg:hidden space-y-6">
            <div className="bg-white rounded-lg px-5 pt-5 pb-6">
              <h2 className="text-base font-semibold text-dark-gray-2 uppercase">
                MEU CARRINHO
              </h2>
              <div className="w-[85%] h-px bg-light-gray-3 mt-3 mb-5" />
              <div className="divide-y divide-light-gray-3">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    variant="mobile"
                  />
                ))}
              </div>
            </div>

            <CouponSection
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              onApply={handleApplyCoupon}
              couponCode={couponCode}
              onRemove={removeCoupon}
              error={couponError}
              idPrefix="mobile-"
            />

            <ShippingSection
              cepInput={cepInput}
              setCepInput={setCepInput}
              onCalculate={handleCalculateShipping}
              shipping={shipping}
              calculated={cepCalculated}
              idPrefix="mobile-"
            />

            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              onContinue={handleContinue}
              variant="mobile"
            />

            <div className="h-36" />
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:block">
            <div className="divide-y divide-light-gray-3">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-light-gray-3 grid grid-cols-2 gap-6">
              <CouponSection
                couponInput={couponInput}
                setCouponInput={setCouponInput}
                onApply={handleApplyCoupon}
                couponCode={couponCode}
                onRemove={removeCoupon}
                error={couponError}
                idPrefix="desktop-"
              />
              <ShippingSection
                cepInput={cepInput}
                setCepInput={setCepInput}
                onCalculate={handleCalculateShipping}
                shipping={shipping}
                calculated={cepCalculated}
                idPrefix="desktop-"
              />
            </div>
          </div>
        </div>

        {/* Coluna Direita: Resumo (Desktop) */}
        <div className="hidden lg:block lg:w-[35%]">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-dark-gray-2 uppercase mb-6">
              RESUMO
            </h2>
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </div>

      {/* Floating CTA Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white px-5 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-30">
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          total={total}
          onContinue={handleContinue}
          disabled={items.length === 0}
        />
      </div>

      {/* Related Products Desktop */}
      {relatedProducts.length > 0 && (
        <div className="hidden lg:block mt-12">
          <Section
            title="Produtos Relacionados"
            link={{ text: 'Ver todos', href: '/products' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}
