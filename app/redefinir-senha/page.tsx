"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RedefinirSenhaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL
    setErro("");

    if (novaSenha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }
    if (!token) {
      setErro("Link inválido. Solicite um novo link de recuperação.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/redefinir-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token, nova_senha: novaSenha }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.detail || "Erro ao redefinir senha");
      setSucesso(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl border-gradient p-8">
      {!sucesso ? (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-1">Redefinir senha</h1>
            <p className="text-sm text-zinc-500">Escolha uma nova senha para sua conta</p>
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
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Nova senha</label>
              <input
                type="password"
                className="input-styled"
                placeholder="Mínimo 6 caracteres"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirmar nova senha</label>
              <input
                type="password"
                className="input-styled"
                placeholder="Repita sua nova senha"
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
                  Redefinindo...
                </span>
              ) : (
                "Redefinir senha"
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Senha redefinida!</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Sua senha foi alterada com sucesso. Agora você pode fazer login com a nova senha.
          </p>
          <Link href="/login" className="btn-primary inline-block text-center">
            Ir para o login
          </Link>
        </div>
      )}

      {!sucesso && (
        <div className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Voltar ao login
          </Link>
        </div>
      )}
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      {/* Background */}
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

        <Suspense fallback={
          <div className="glass rounded-2xl border-gradient p-8 text-center">
            <p className="text-zinc-500">Carregando...</p>
          </div>
        }>
          <RedefinirSenhaForm />
        </Suspense>
      </div>
    </main>
  );
}