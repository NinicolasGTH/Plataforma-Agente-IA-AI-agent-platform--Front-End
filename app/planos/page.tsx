"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PlanosPage() {
  const router = useRouter();
  const [planoAtual, setPlanoAtual] = useState("Carregando...");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function carregarStatus() {
      try {
        const res = await fetch(`${API_URL}/pagamento/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.detail || "Erro ao carregar plano");

        setPlanoAtual(data.plano || "Gratuito");
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro ao verificar plano");
      }
    }

    carregarStatus();
  }, [router]);

  async function assinarPro() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/pagamento/criar-checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.detail || "Erro ao criar checkout");

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não retornada");
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <Link href="/chat" className="text-sm text-zinc-400 hover:text-white transition-colors">
            ← Voltar para o chat
          </Link>

          <div className="text-sm text-zinc-400">
            Plano atual: <span className="font-semibold text-cyan-400">{planoAtual}</span>
          </div>
        </header>

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Escolha seu <span className="text-gradient">plano</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Comece grátis e faça upgrade para desbloquear uma experiência mais completa.
          </p>
        </div>

        {erro && (
          <div className="mb-6 max-w-xl mx-auto rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {erro}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Plano Gratuito */}
          <div className="glass rounded-2xl border-gradient p-8">
            <div className="mb-4">
              <p className="text-sm text-zinc-400">Plano</p>
              <h2 className="text-2xl font-bold">Gratuito</h2>
            </div>

            <p className="text-zinc-500 mb-6">
              Ideal para testar a plataforma e usar recursos básicos.
            </p>

            <ul className="space-y-3 text-sm text-zinc-300 mb-8">
              <li>✓ Até 20 mensagens por dia</li>
              <li>✓ Acesso básico ao chat</li>
              <li>✓ Histórico de conversas</li>
            </ul>

            <button
              disabled
              className="w-full rounded-xl border border-zinc-700/50 px-4 py-3 text-sm font-medium text-zinc-500 cursor-not-allowed"
            >
              Plano atual padrão
            </button>
          </div>

          {/* Plano Pro */}
          <div className="glass rounded-2xl border border-cyan-500/30 p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
              Recomendado
            </div>

            <div className="mb-4">
              <p className="text-sm text-cyan-400">Plano</p>
              <h2 className="text-2xl font-bold">Pro</h2>
            </div>

            <p className="text-zinc-400 mb-6">
              Desbloqueie uso ampliado e uma experiência premium com IA.
            </p>

            <ul className="space-y-3 text-sm text-zinc-200 mb-8">
              <li>✓ Acesso premium</li>
              <li>✓ Mais liberdade de uso</li>
              <li>✓ Melhor experiência para produtividade</li>
              <li>✓ Evolução futura com novos recursos</li>
            </ul>

            <button
              onClick={assinarPro}
              disabled={loading || planoAtual === "Pro"}
              className="btn-primary"
            >
              {planoAtual === "Pro"
                ? "Você já é Pro"
                : loading
                ? "Redirecionando..."
                : "Assinar plano Pro"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}