import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  FilterGroup,
  getProducts,
  type Product,
  ProductCard
} from '@/features/products'
import {
  Pagination,
  ProductCardSkeleton,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components'

/**
 * Página de Listagem de Produtos.
 * Implementa filtros dinâmicos de Marca, Categoria e Gênero,
 * além de ordenação por preço e paginação integrada com o TanStack Query.
 */
export default function ProductListingPage() {
  const [searchParams] = useSearchParams()
  const filter = searchParams.get('filter') || ''
  const categoryParam = searchParams.get('category') || ''
  const [filterBrand, setFilterBrand] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string[]>([])
  const [filterGender, setFilterGender] = useState<string[]>([])
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'lowest' | 'highest'>('lowest')
  const [page, setPage] = useState(1)

  // Reinicia a paginação quando os critérios de busca mudam.
  useEffect(() => {
    setPage(1)
  }, [filter, categoryParam, filterBrand, filterCategory, filterGender])

  // Busca uma amostra ampla para derivar opções de filtro (marca/categoria) da interface.
  const { data: filterOptionsResponse } = useQuery({
    queryKey: ['products-filter-options', filter],
    queryFn: async () => {
      const options: any = {
        page: 1,
        limit: 100
      }

      if (filter) options.match = filter

      return getProducts(options)
    },
    placeholderData: keepPreviousData
  })

  // Mapeia nome de categoria para ID usado pela API no filtro `category_ids`.
  const categoryMap = useState(() => new Map<string, string>())[0]
  const filterOptionsProducts = filterOptionsResponse?.data || []

  useEffect(() => {
    if (filterOptionsProducts.length > 0) {
      filterOptionsProducts.forEach((p: Product) => {
        if (p.categories && p.categories.length > 0) {
          p.categories.forEach((cat: { id: string; name: string }) => {
            categoryMap.set(cat.name, cat.id)
          })
        }
      })
    }
  }, [filterOptionsProducts, categoryMap])

  // Sincroniza o parâmetro `category` da URL com o estado de filtros laterais.
  useEffect(() => {
    if (categoryParam && categoryMap.has(categoryParam)) {
      setFilterCategory((prev) => {
        if (prev.includes(categoryParam)) return prev
        return [...prev, categoryParam]
      })
    }
  }, [categoryParam, categoryMap])

  const {
    data: response,
    isLoading,
    isFetching,
    error
  } = useQuery({
    queryKey: [
      'products',
      page,
      filter,
      categoryParam,
      filterBrand,
      filterCategory,
      filterGender,
      sortOrder
    ],
    queryFn: async () => {
      // Simula uma latência curta para exibir transições de carregamento de forma consistente.
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Monta os parâmetros dinâmicos enviados para a API.
      // biome-ignore lint/suspicious/noExplicitAny: Options can be very dynamic based on backend typing
      const options: any = {
        page: page,
        limit: 12
      }

      // Aplica filtros selecionados pelo usuário.
      if (filter) options.match = filter
      else if (categoryParam && filterCategory.length === 0) {
        options.match = categoryParam
      }
      if (filterGender.length > 0) {
        const genderValues = filterGender.map((g) =>
          g === 'Unissex' ? 'Unisex' : g
        )
        options.gender = genderValues.join(',')
      }
      if (filterBrand.length > 0) {
        options.brand = filterBrand.join(',')
      }

      // Converte nomes de categoria selecionados para IDs esperados pela API.
      if (filterCategory.length > 0) {
        const categoryIds = filterCategory
          .map((name) => categoryMap.get(name))
          .filter(Boolean) as string[]
        if (categoryIds.length > 0) {
          options.category_ids = categoryIds
        }
      }

      // Executa a busca no serviço HTTP de produtos.
      const res = await getProducts(options)

      // Aplica ordenação local para complementar o comportamento da listagem.
      if (sortOrder === 'lowest') {
        res.data.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      } else if (sortOrder === 'highest') {
        res.data.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
      }

      return res
    },
    placeholderData: keepPreviousData // Mantém resultados anteriores enquanto a próxima página/filtro é carregada.
  })

  const products = response?.data || []
  // Total count defined by the backend
  const productCount: number = response?.total ?? products.length

  // Deriva as opções de filtros a partir da resposta sem filtros específicos.

  const brandOptions = Array.from(
    new Set(filterOptionsProducts.map((p: Product) => p.brand).filter(Boolean))
  ).map((b: unknown) => ({ label: String(b), value: String(b) }))

  const categoryOptions = Array.from(
    new Set(
      filterOptionsProducts
        .flatMap((p: Product) => {
          if (p.categories && p.categories.length > 0) {
            return p.categories.map((cat: { name: string }) => cat.name)
          }
          return p.category ? [p.category] : []
        })
        .filter(Boolean)
    )
  ).map((c: unknown) => ({ label: String(c), value: String(c) }))

  const genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Unissex', value: 'Unissex' }
  ]

  const hasActiveFilters =
    filterBrand.length > 0
    || filterCategory.length > 0
    || filterGender.length > 0

  // Render the filter content (reused in both desktop sidebar and mobile sheet)
  const renderFilterContent = () => (
    <>
      <FilterGroup
        title="Marca"
        inputType="checkbox"
        options={brandOptions}
        selectedValues={filterBrand}
        onChange={(val, checked) => {
          if (checked) setFilterBrand((s) => Array.from(new Set([...s, val])))
          else setFilterBrand((s) => s.filter((i) => i !== val))
        }}
      />

      <FilterGroup
        title="Categoria"
        inputType="checkbox"
        options={categoryOptions}
        selectedValues={filterCategory}
        onChange={(val, checked) => {
          if (checked)
            setFilterCategory((s) => Array.from(new Set([...s, val])))
          else setFilterCategory((s) => s.filter((i) => i !== val))
        }}
      />

      <FilterGroup
        title="Gênero"
        inputType="checkbox"
        options={genderOptions}
        selectedValues={filterGender}
        onChange={(val, checked) => {
          if (checked) setFilterGender((s) => Array.from(new Set([...s, val])))
          else setFilterGender((s) => s.filter((i) => i !== val))
        }}
      />
    </>
  )

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Mobile/Tablet: Sort and Filter Bar */}
      <div className="lg:hidden flex items-center gap-3 mb-6">
        <div className="flex-1">
          <label htmlFor="sortOrderMobile" className="sr-only">
            Ordenar por
          </label>
          <select
            id="sortOrderMobile"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as 'lowest' | 'highest')
            }
            className="w-full h-11 border border-light-gray-2 rounded px-3 text-dark-gray-2 text-sm bg-white"
          >
            <option value="lowest">Ordenar por: menor preço</option>
            <option value="highest">Ordenar por: maior preço</option>
          </select>
        </div>

        {/* Mobile Filter Button with Sheet */}
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={`w-11 h-11 flex items-center justify-center rounded transition-colors ${
                hasActiveFilters ? 'bg-tertiary' : 'bg-primary'
              } text-white`}
              aria-label="Abrir filtros"
            >
              <Filter size={20} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] max-w-90 bg-white p-0 flex flex-col"
            aria-label="Filtros de produtos"
          >
            {/* Header do Sheet - Sticky */}
            <SheetHeader className="p-5 border-b border-light-gray-2 sticky top-0 bg-white z-10">
              <SheetTitle className="text-dark-gray-2 font-bold text-lg text-left">
                Filtrar por
              </SheetTitle>
            </SheetHeader>

            {/* Conteúdo Scrollável dos Filtros */}
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterContent()}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        {/* Desktop Sidebar de Filtros - Hidden on Mobile/Tablet */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg">
            <h2 className="text-dark-gray-2 font-bold text-base mb-6">
              Filtrar por
            </h2>
            <div className="border-b border-light-gray-2 mb-6" />

            <label
              htmlFor="sortOrderDesktop"
              className="block text-dark-gray-2 mb-2"
            >
              Ordenar por
            </label>
            <select
              id="sortOrderDesktop"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'lowest' | 'highest')
              }
              className="w-full mb-6 h-12 border border-light-gray-2 rounded px-3"
            >
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>

            {renderFilterContent()}
          </div>
        </aside>

        {/* Área Principal de Produtos */}
        <main>
          <h1 className="text-dark-gray-2 text-lg md:text-2xl font-bold mb-2 md:mb-4">
            {filter
              ? `Resultados para "${filter}"`
              : categoryParam
                ? `Categoria: ${categoryParam}`
                : 'Todos os produtos'}
          </h1>
          <p className="text-dark-gray-2 text-sm md:text-base mb-4 md:mb-6">
            {productCount}{' '}
            {productCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>

          {/* Grid de Produtos */}
          {error ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <p className="text-lg text-error font-semibold">
                {error instanceof Error
                  ? error.message
                  : 'Erro ao buscar produtos'}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-2 min-[426px]:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-x-8 lg:gap-y-6">
              {[
                'l1',
                'l2',
                'l3',
                'l4',
                'l5',
                'l6',
                'l7',
                'l8',
                'l9',
                'l10',
                'l11',
                'l12'
              ].map((id) => (
                <div key={id} className="h-full w-full">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-lg text-light-gray">
                Nenhum produto encontrado.
              </p>
            </div>
          ) : (
            <>
              <div
                className={`min-h-[800px] content-start grid grid-cols-2 min-[426px]:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-x-8 lg:gap-y-6 transition-opacity duration-200 ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {products.map((product, idx) => (
                  <ProductCard
                    key={`${product.id}-${idx}`}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    priceDiscount={product.priceDiscount}
                    category={product.category}
                  />
                ))}
              </div>

              {!isLoading && (
                <Pagination
                  currentPage={page}
                  limit={12}
                  totalItems={productCount}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
