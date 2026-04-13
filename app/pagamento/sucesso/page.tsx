"use client";

import Link from "next/link";
import { Suspense } from "react";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

 const API_URL = typeof window !== "undefined" && (
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_MOBILE;

function PagamentoSucessoContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [plano, setPlano] = useState("Carregando...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verificarPlano() {
            const token = localStorage.getItem("token");

            if (!token) {
                setPlano("Necessário autenticação para verificar o plano");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/pagamento/status`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();

                if (res.ok) {
                    setPlano(data.plano || "Não identificado");
                } else {
                    setPlano("Erro ao verificar plano: " + (data?.detail || "Desconhecido"));
                }
                } catch (err) {
                    setPlano("Erro ao verificar plano: " + (err instanceof Error ? err.message : "Desconhecido"));
                } finally {
                    setLoading(false);
                }
            }
            verificarPlano();
        }, []);


     return (
    <main className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-xl text-center animate-slideUp">
        <div className="glass rounded-2xl border-gradient p-10">
          <div className="relative mx-auto mb-8 w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">Pagamento realizado com sucesso!</h1>
          <p className="text-zinc-400 mb-2">
            Seu checkout foi concluído e o Stripe já enviou a confirmação para o backend.
          </p>

          <div className="mt-6 mb-8 rounded-xl border border-zinc-700/50 bg-zinc-900/40 p-4 text-left text-sm">
            <p className="text-zinc-400 mb-2">
              <span className="font-medium text-zinc-200">Status do plano:</span>{" "}
              {loading ? "verificando..." : plano}
            </p>

            {sessionId && (
              <p className="text-zinc-500 break-all">
                <span className="font-medium text-zinc-300">Session ID:</span> {sessionId}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/chat" className="btn-primary inline-flex justify-center w-full">
              Ir para o chat
            </Link>

            <Link
              href="/planos"
              className="w-full rounded-xl border border-zinc-700/50 px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-200"
            >
              Ver plano
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PagamentoSucessoPage() {
  return (
    <Suspense fallback={<main className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden"><p className="text-zinc-400">Carregando...</p></main>}>
      <PagamentoSucessoContent />
    </Suspense>
  );
}