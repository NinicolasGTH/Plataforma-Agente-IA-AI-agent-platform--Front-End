import Link from "next/link";

const features = [
  {
    title: "Chat Inteligente",
    desc: "Converse com uma IA avançada que entende contexto e resolve problemas complexos.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: "Calculadora IA",
    desc: "Resolva cálculos avançados com inteligência artificial integrada.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008H15.75v-.008Zm0 2.25h.008v.008H15.75V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
  },
  {
    title: "Clima em Tempo Real",
    desc: "Consulte informações climáticas atualizadas de qualquer cidade do mundo.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
  },
  {
    title: "Notícias Resumidas",
    desc: "Receba resumos inteligentes das principais notícias do dia.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 py-8">
        {/* Header */}
        <header className="mb-20 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Agente IA</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-zinc-700/50 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-200"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              Criar Conta
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center text-center animate-slideUp">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs font-medium text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Plataforma de produtividade com IA
          </div>
          <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl max-w-3xl">
            Converse, calcule e descubra com{" "}
            <span className="text-gradient">inteligência artificial</span>
          </h2>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400">
            Uma plataforma completa que integra chat inteligente, calculadora avançada,
            clima em tempo real e resumos de notícias — tudo potencializado por IA.
          </p>
          <div className="flex items-center gap-4 mb-16">
            <Link
              href="/register"
              className="group rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-zinc-900 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Começar gratuitamente
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="rounded-xl px-6 py-3.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Já tenho conta
            </Link>
          </div>

          {/* Feature cards grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            {features.map((item, idx) => (
              <div
                key={item.title}
                className="group border-gradient rounded-2xl p-5 glass hover:bg-zinc-800/50 transition-all duration-300 cursor-default animate-slideUp text-left"
                style={{ animationDelay: `${0.1 * (idx + 1)}s`, animationFillMode: "both" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{item.title}</p>
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats / Trust */}
        <section className="mt-24 animate-slideUp" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
          <div className="glass rounded-2xl p-8 border-gradient">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gradient">4+</div>
                <div className="text-xs text-zinc-500 mt-1">Ferramentas IA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">24/7</div>
                <div className="text-xs text-zinc-500 mt-1">Disponível</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">LLM</div>
                <div className="text-xs text-zinc-500 mt-1">Llama 3.3 70B</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">Grátis</div>
                <div className="text-xs text-zinc-500 mt-1">Para começar</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 mb-8 text-center text-xs text-zinc-600">
          <p>&copy; 2026 Agente IA. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  );
}
