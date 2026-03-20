import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterLink } from '@/shared/components/RouterLink'

/**
 * Página inicial de Cadastro.
 * Tela com campo de email e redirecionamento para o formulário completo.
 * Layout de duas colunas com imagens decorativas de tênis.
 */
const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navega para o formulário completo passando o email via state do router
    navigate('/register-form-page', { state: { email } })
  }

  return (
    <section className="flex-1 relative overflow-hidden">
      {/* Fundo gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, #E6E4FF 0%, #C9C6F5 50%, #B8B4EE 100%)'
        }}
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 max-w-360 mx-auto px-4 lg:px-25 flex items-center min-h-0 lg:min-h-135 py-12 lg:py-20">
        {/* Grid de duas colunas */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-8">
          {/* Coluna esquerda — Card de cadastro */}
          <div className="bg-white rounded-lg p-8 w-full max-w-115 mx-auto lg:mx-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            {/* Título */}
            <h1 className="text-2xl font-bold text-dark-gray mb-2">
              Crie sua conta
            </h1>

            {/* Subtítulo com link para login */}
            <p className="text-sm text-dark-gray-3 mb-6">
              Já possui uma conta?{' '}
              <RouterLink
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Entre aqui.
              </RouterLink>
            </p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Campo de e-mail */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="register-email"
                  className="text-[13px] font-medium text-dark-gray"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  placeholder="Insira seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-md bg-light-gray-3 border-none px-3 text-sm text-dark-gray placeholder:text-light-gray outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Botão de envio */}
              <button
                type="submit"
                className="h-11 w-full flex items-center justify-center bg-primary text-white font-semibold rounded-md hover:brightness-90 transition-all cursor-pointer"
              >
                Criar Conta
              </button>
            </form>

            {/* Seção de login social removida para simplificação */}
          </div>

          {/* Coluna direita — Área visual (tênis decorativos) */}
          <div className="hidden lg:flex items-center justify-center relative h-100">
            {/* Tênis 1 — maior, em destaque na frente */}
            <img
              src="/tenis-1-tela-de-cadastro.webp"
              alt="Tênis em destaque"
              className="absolute w-80 right-4 bottom-4 drop-shadow-lg z-10 -rotate-15"
            />
            {/* Tênis 2 — menor, atrás */}
            <img
              src="/tenis-2-tela-de-cadastro.webp"
              alt="Tênis em destaque"
              className="absolute w-64 right-72 top-16 drop-shadow-md z-0 rotate-10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
