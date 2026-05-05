"use client";

import { useEffect, useState, useRef } from "react";

type Mensagem = {
  papel: string;
  conteudo: string;
};

type ConversaResumo = {
  id: number;
  titulo: string;
  atualizado_em: string;
};

export default function ChatPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [conversas, setConversas] = useState<ConversaResumo[]>([]);
  const [conversaAtual, setConversaAtual] = useState<number | null>(null);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cancelado, setCancelado] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("")
  const [plano, setPlano] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchConversas() {
      setPlano(localStorage.getItem("plano"));
      try {
        const res = await fetch(`${API_URL}/conversas/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar conversas");
        const data = await res.json();
        setConversas(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      }
    }
    fetchConversas();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function carregarConversa(id: number) {
    try {
      const res = await fetch(`${API_URL}/conversas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao carregar conversa");
      const data = await res.json();
      setMensagens(data.mensagens || []);
      setConversaAtual(id);
      setSidebarOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  }

  async function enviarMensagem(texto: string) {
    setLoading(true);
    setError("");

    setMensagens((prev) => [...prev, { papel: "user", conteudo: texto }]); // a Mensagem do usuário é adicionada imediatamente para melhor UX

    try {
      const res = await fetch(`${API_URL}/chat/enviar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          mensagem: texto,
          ...(conversaAtual ? { id_conversa: conversaAtual } : {}),
        }),
      });
      if (!res.ok) throw new Error("Erro ao enviar mensagem");
      const data = await res.json();

      if (!conversaAtual && data.id_conversa) {
        setConversaAtual(data.id_conversa);
        // Atualiza a lista de conversas para incluir a nova conversa criada
        const res2 = await fetch(`${API_URL}/conversas/`, {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        });
        const data2 = await res2.json();
        setConversas(Array.isArray(data2) ? data2 : []);
      }

      setMensagens((prev) => [
        ...prev,
        { papel: "assistant", conteudo: data.resposta },
      ]);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function cancelarAssinatura() {
    try {
      const res = await fetch(`${API_URL}/cancelar-assinatura`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      })
      if (!res.ok) throw new Error ("Erro ao cancelar a assinatura")
      const data = await res.json();
      if (data.status === "ok")
        setCancelado(true);
        setMensagemSucesso("Sua assinatura foi cancelada com sucesso. Você terá acesso ao pro até o final do período vigente.")

        setTimeout(() => {
          window.location.reload();
        }, 3500)
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }
      
      

  function novaConversa() {
    setMensagens([]);
    setConversaAtual(null);
    setSidebarOpen(false);
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-72 bg-[#0c0c0e]/95 backdrop-blur-xl border-r border-zinc-800/50 p-4 transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <span className="font-bold text-sm">Agente IA</span>
          </div>

        </div>


        <button
          onClick={novaConversa}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 text-zinc-900 font-semibold transition-all duration-200 rounded-xl py-2.5 text-sm cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nova conversa
        </button>



        <div className="mt-6 text-[10px] uppercase tracking-widest text-zinc-600 font-semibold px-1">
          Histórico
        </div>

        <div className="mt-3 flex-1 space-y-1 overflow-y-auto">
          {conversas.length === 0 ? (
            <div className="text-zinc-600 text-xs px-3 py-6 text-center">
              Nenhuma conversa ainda
            </div>
          ) : (
            conversas.map((c) => (
              <button
                key={c.id}
                onClick={() => carregarConversa(c.id)}
                className={`w-full text-left px-3 py-2.5 text-sm rounded-xl transition-all duration-200 truncate ${conversaAtual === c.id
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 cursor-pointer"
                  }`}
              >
                {c.titulo || `Conversa ${c.id}`}
              </button>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 px-1 text-[10px] text-zinc-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Llama 3.3 70B — Groq
          </div>
        </div>
      </aside>

      {/* CHAT AREA */}
      <section className="flex flex-col flex-1 relative min-w-0">

      {/* HEADER */}
        <header className="h-14 border-b border-zinc-800/50 flex items-center justify-between px-4 md:px-6 glass">
  <div className="flex items-center gap-3">
    <button
      onClick={() => setSidebarOpen(true)}
      className="lg:hidden p-2 rounded-lg hover:bg-zinc-800/60 transition-colors cursor-pointer"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-md shadow-cyan-500/20 flex items-center justify-center">
      <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    </div>
    <div>
      <div className="font-semibold text-sm">Agente IA</div>
      <div className="text-[10px] text-zinc-500">Online</div>
    </div>
  </div>

  <div className="flex items-center gap-3">
    {/* Lógica condicional: Se for Pro, mostra cancelar. Se não, mostra Upgrade. */}
    {plano === "Pro" ? (
      <button 
        onClick={() => {
          if (window.confirm("Tem certeza que deseja cancelar sua assinatura Pro?")) {
            cancelarAssinatura();
          }
        }}
        className="rounded-xl border border-red-500/30 px-4 py-2 text-xs md:text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
      > 
        Cancelar Plano
      </button>
    ) : (
      <a 
        href="/planos"
        className="rounded-xl border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
      > 
        Upgrade Pro
      </a>
    )}

    {/* 👇 Botão de logout */}
    <button
      onClick={logout}
      className="rounded-xl border border-zinc-700/50 px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 cursor-pointer"
    >
      Sair
    </button>
  </div>
</header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {mensagens.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 flex items-center justify-center mb-6 glow-sm">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Como posso te ajudar?</h3>
                <p className="text-sm text-zinc-500 max-w-sm">
                  Faça perguntas, peça cálculos ou explore as ferramentas disponíveis.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-2 w-full max-w-md">
                  {[
                    "Explique machine learning",
                    "Calcule 15% de 2500",
                    "Como funciona o React?",
                    "Resuma as notícias de hoje",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setTexto(s);
                      }}
                      className="text-left text-xs text-zinc-400 px-4 py-3 rounded-xl border border-zinc-800/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-zinc-300 transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mensagens.map((msg, idx) => (
              <div
                key={idx}
                className={`flex animate-fadeIn ${msg.papel === "assistant" ? "justify-start" : "justify-end"
                  }`}
              >
                <div className="flex gap-3 max-w-[80%]">
                  {msg.papel === "assistant" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mt-1">
                      <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed ${msg.papel === "assistant"
                      ? "bg-zinc-800/60 border border-zinc-700/30 rounded-2xl rounded-tl-md text-zinc-200"
                      : "bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-2xl rounded-tr-md text-zinc-900 font-medium"
                      }`}
                  >
                    {msg.conteudo}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-3 animate-fadeIn">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <div className="bg-zinc-800/60 border border-zinc-700/30 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot" />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 flex items-center gap-2 max-w-md mx-auto">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-xl p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!texto.trim()) return;
              enviarMensagem(texto);
              setTexto("");
            }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-2 items-end glass rounded-2xl p-2 border-gradient">
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent text-sm focus:outline-none px-3 py-2.5 placeholder:text-zinc-600"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!texto.trim() || loading}
                className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-30 disabled:shadow-none text-zinc-900 transition-all duration-200 rounded-xl p-2.5 cursor-pointer"

              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 text-center mt-2">
              Agente IA pode cometer erros. Verifique informações importantes.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}