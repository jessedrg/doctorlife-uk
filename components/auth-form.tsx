"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { BrandLogo } from "./brand-logo"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === "sign-up"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message ?? "Algo ha ido mal. Inténtalo de nuevo.")
      return
    }

    // El layout del destino reenvía a cada usuario según su rol.
    router.push("/portal")
    router.refresh()
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-[420px]">
        <Link href="/" className="mb-8 flex justify-center">
          <BrandLogo />
        </Link>

        <div className="rounded-[26px] border border-ink/10 bg-cream p-7 sm:p-8" style={{ boxShadow: "0 24px 60px rgba(0,0,0,.08)" }}>
          <h1 className="text-[26px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
            {isSignUp ? "Crea tu cuenta" : "Bienvenido de nuevo"}
          </h1>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
            {isSignUp
              ? "Regístrate para gestionar tu tratamiento."
              : "Inicia sesión para acceder a tu portal."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {isSignUp && (
              <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                Nombre completo
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="rounded-[13px] border border-ink/15 bg-warm px-[16px] py-3.5 text-[15.5px] text-ink outline-none transition-colors focus:border-amber"
                />
              </label>
            )}
            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="rounded-[13px] border border-ink/15 bg-warm px-[16px] py-3.5 text-[15.5px] text-ink outline-none transition-colors focus:border-amber"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                className="rounded-[13px] border border-ink/15 bg-warm px-[16px] py-3.5 text-[15.5px] text-ink outline-none transition-colors focus:border-amber"
              />
            </label>

            {error && (
              <p className="text-[13.5px] text-clay" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full cursor-pointer rounded-[13px] bg-ink py-3.5 text-[15px] font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Un momento..." : isSignUp ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-ink-soft">
            {isSignUp ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
            <Link
              href={isSignUp ? "/sign-in" : "/sign-up"}
              className="font-medium text-ink underline underline-offset-4"
            >
              {isSignUp ? "Inicia sesión" : "Regístrate"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
