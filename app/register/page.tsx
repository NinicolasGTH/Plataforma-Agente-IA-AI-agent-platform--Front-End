"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [contador, setContador] = useState(5);
  const API_URL = typeof window !== "undefined" && (
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_MOBILE;

  useEffect(() => {
    if (!sucesso) return;
    if (contador === 0) {
      router.push("/login");
      return;
    }
    const timer = setTimeout(() => setContador((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [sucesso, contador, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeUsuario, email, senha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Falha no registro");
      setSucesso(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md animate-slideUp">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <span className="text-xl font-bold">Agente IA</span>
          </Link>
        </div>

        {sucesso ? (
          /* Card de sucesso */
          <div className="glass rounded-2xl border-gradient p-8 text-center animate-slideUp">
            <div className="relative mx-auto mb-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Conta criada com sucesso!</h2>
            <p className="text-zinc-400 text-sm mb-1">
              Um e-mail de verificação foi enviado para
            </p>
            <p className="text-cyan-400 font-medium mb-6">{email}</p>
            <p className="text-zinc-500 text-xs mb-6">
              Verifique sua caixa de entrada e clique no link para ativar sua conta!
            </p>
            <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
              <svg className="w-4 h-4 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Redirecionando para o login em{" "}
              <span className="text-cyan-400 font-bold">{contador}s</span>
            </div>
          </div>
        ) : (
          /* Card do formulário */
          <div className="glass rounded-2xl border-gradient p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold mb-1">Criar sua conta</h1>
              <p className="text-sm text-zinc-500">Preencha os dados para começar</p>
            </div>

            {erro && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Nome de usuário</label>
                <input
                  className="input-styled"
                  placeholder="Escolha um nome de usuário"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                <input
                  type="email"
                  className="input-styled"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Senha</label>
                <input
                  type="password"
                  className="input-styled"
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirmar senha</label>
                <input
                  type="password"
                  className="input-styled"
                  placeholder="Repita sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>
              <button disabled={loading} className="btn-primary mt-2">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Criando conta...
                  </span>
                ) : (
                  "Criar conta"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-500">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
