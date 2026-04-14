"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ConfirmarEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [mensagem, setMensagem] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMensagem("Token não encontrado.");
      return;
    }

    async function confirmar() {
      try {
        const res = await fetch(
          `${API_URL}/auth/confirmar-email?token=${token}`
        );
        const data = await res.json();

        if (res.ok) {
          router.push("/pagina-sucesso");
        } else {
          setStatus("error");
          setMensagem(data?.detail || "Token inválido ou expirado.");
        }
      } catch {
        setStatus("error");
        setMensagem("Erro ao conectar com o servidor.");
      }
    }

    confirmar();
  }, [token]);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md text-center animate-slideUp">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <svg className="w-10 h-10 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-zinc-400">Confirmando seu e-mail...</p>
          </div>
        )}

        {status === "error" && (
          <div className="glass rounded-2xl border-gradient p-8">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Ops, algo deu errado</h1>
            <p className="text-zinc-500 mb-6">{mensagem}</p>
            <Link href="/login" className="btn-primary inline-flex justify-center">
              Ir para o login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ConfirmarEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="relative flex min-h-screen items-center justify-center px-6">
          <p className="text-zinc-400">Carregando...</p>
        </main>
      }
    >
      <ConfirmarEmailContent />
    </Suspense>
  );
}
